package com.example.phili.rip_mobile;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.media.Image;
import android.media.MediaPlayer;
import android.nfc.Tag;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TabLayout;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TabHost;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.ImageLoader;
import com.android.volley.toolbox.ImageRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarDrawerToggle;
import android.widget.TextView;
import android.widget.TabWidget;
import android.widget.TextView;
import android.view.View;
import android.view.MenuItem;

public class musicexplorer extends AppCompatActivity implements View.OnClickListener{

    private static final String TAG = "MyActivity";
    private String[][] song, artist, musicAlbum;
    private String[] songImg, artistImg, musicAlbumImg;
    private TabHost mTabHost;
    private GridView gv1, gv2, gv3, gv4;
    public static Bitmap[] albumImage, tempBitmap;
    private boolean loaded, paused, loadSong, loadArt, loadAlb;
    public static MediaPlayer mp;
    public static int oneTimeOnly = 0;
    private String token;
    private ImageView play, next, back, imageView, currPlay;
    private TextView artistView, songView;
    private DrawerLayout mDrawerlayout;
    private ActionBarDrawerToggle mToggle;
    private int gridCount, songPos;

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if(mToggle.onOptionsItemSelected(item)) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_musicexplorer);
        song = new String[20][3];
        artist = new String[20][3];
        musicAlbum = new String[20][3];
        musicAlbumImg = new String[20];
        songImg = new String[20];
        artistImg = new String[20];
        albumImage = new Bitmap[20];
        tempBitmap = new Bitmap[20];
        loaded = false;
        paused = false;
        token = getIntent().getExtras().getString("token");
        gridCount = 0;
        loadSong = false;
        loadArt = false;
        loadAlb = false;
        songPos = 0;

        mTabHost = (TabHost)findViewById(R.id.tabHost);
        mTabHost.setup();

        mDrawerlayout = (DrawerLayout)findViewById(R.id.drawerLayout);
        mToggle = new ActionBarDrawerToggle(this, mDrawerlayout, R.string.open, R.string.close);
        mDrawerlayout.addDrawerListener(mToggle);
        mToggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        imageView = (ImageView) findViewById(R.id.currentplayingimg);
        play = (ImageView) findViewById(R.id.playmini);
        back = (ImageView) findViewById(R.id.backmin);
        next = (ImageView) findViewById(R.id.imageView5);
        artistView = (TextView) findViewById(R.id.artistmin);
        songView = (TextView) findViewById(R.id.songmin);
        currPlay = (ImageView) findViewById(R.id.currentplayingimg);

        currPlay.setOnClickListener(this);
        play.setOnClickListener(this);
        back.setOnClickListener(this);
        next.setOnClickListener(this);

        TabHost.TabSpec spec;

        //Album

        spec = mTabHost.newTabSpec("album")
                .setIndicator("Albums")
                .setContent(R.id.albumsgrid);
        mTabHost.addTab(spec);

        //Artist

        spec = mTabHost.newTabSpec("artist")
                .setIndicator("Artists")
                .setContent(R.id.artistsgrid);
        mTabHost.addTab(spec);


        //Songs

        spec = mTabHost.newTabSpec("songs")
                .setIndicator("Songs")
                .setContent(R.id.songsgrid);
        mTabHost.addTab(spec);

        //Genre

        spec = mTabHost.newTabSpec("playlist")
                .setIndicator("Playlist")
                .setContent(R.id.genresgrid);
        mTabHost.addTab(spec);

        //SETS THE TEXT SIZE OF THE TABS=================================
        final TabWidget tw = mTabHost.findViewById(android.R.id.tabs);
        for (int i = 0; i < tw.getChildCount(); ++i)
        {
            final View tabView = tw.getChildTabViewAt(i);
            final TextView tv = tabView.findViewById(android.R.id.title);
            tv.setTextSize(12);
        }
        //===============================================================


        mTabHost.setOnTabChangedListener(new TabHost.OnTabChangeListener() {
            @Override
            public void onTabChanged(String s) {
                if(s.equals("artist")){
                    if (!loadAlb){
                        getArtists(gv2);
                        loadAlb = !loadAlb;
                    }
                }
                else if (s.equals("songs")){
                    if(!loadSong){
                        getSongs(gv3);
                        loadSong = !loadSong;
                    }
                }
            }
        });

        gv1 = (GridView)findViewById(R.id.albumsgrid);
        gv2 = (GridView)findViewById(R.id.artistsgrid);
        gv3 = (GridView)findViewById(R.id.songsgrid);
        gv4 = (GridView)findViewById(R.id.genresgrid);

        gv3.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v,
                                    int position, long id) {
                if (loaded) {
                    sendSongRequest(position);
                }
            }
        });
        getMusicAlbums(gv1);
    }

    private void getSongs(final GridView gv){
        Log.i(TAG,"getSongs");
        String[] headersType = new String[1];
        String[] headersVal = new String[1];
        headersType[0] = "page";
        headersVal[0] = "0";

        final serverLink sender = new serverLink(this);
        sender.sendServerRequest(headersType, headersVal, "/api/getsongs", true,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    JSONArray temp = result.getJSONArray("result");
                    for (int k = 0; k<temp.length(); k++){
                        Log.i(TAG,"" + k + ": " + temp.getJSONObject(k).toString());
                        song[k][0] = temp.getJSONObject(k).getString("Title");
                        song[k][1] = temp.getJSONObject(k).getString("Artist");
                        song[k][2] = temp.getJSONObject(k).getString("Album");
                        songImg[k] = temp.getJSONObject(k).getString("album_image");
                    }
                    getAlbumArt(songImg, gv, temp.length(),song);
                }
                catch (Exception e){
                    Log.i(TAG,result.toString());
                }
            }
        });
    }

    private void getMusicAlbums(final GridView gv){
        Log.i(TAG,"getMusicAlbums");
        String[] headersType = new String[1];
        String[] headersVal = new String[1];
        headersType[0] = "page";
        headersVal[0] = "0";

        final serverLink sender = new serverLink(this);
        sender.sendServerRequest(headersType, headersVal, "/api/getalbums", true,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    JSONArray temp = result.getJSONArray("result");
                    for (int k = 0; k<temp.length(); k++){
                        Log.i(TAG,"" + k + ": " + temp.getJSONObject(k).toString());
                        musicAlbum[k][0] = temp.getJSONObject(k).getString("Album");
                        musicAlbum[k][1] = temp.getJSONObject(k).getString("Artist");
                        musicAlbumImg[k] = temp.getJSONObject(k).getString("image_name");
                        Log.i(TAG,"" + k + ": " + " album: " + musicAlbum[k][0] + " img: " + musicAlbumImg[k]);
                    }
                    getMusicAlbumsImages(musicAlbumImg, gv, temp.length(),musicAlbum);
                }
                catch (Exception e){
                    Log.i(TAG,result.toString());
                }
            }
        });
    }

    private void getArtists(final GridView gv){
        Log.i(TAG,"getArtists");
        String[] headersType = new String[1];
        String[] headersVal = new String[1];
        headersType[0] = "page";
        headersVal[0] = "0";

        final serverLink sender = new serverLink(this);
        sender.sendServerRequest(headersType, headersVal, "/api/getartists", true,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    JSONArray temp = result.getJSONArray("result");
                    for (int k = 0; k<temp.length(); k++){
                        Log.i(TAG,"" + k + ": " + temp.getJSONObject(k).toString());
                        artist[k][0] = temp.getJSONObject(k).getString("Artist");
                        artistImg[k] = temp.getJSONObject(k).getString("profilepicture");
                        Log.i(TAG,"" + k + ": " + " artist: " + artist[k][0]+ " img: " + artistImg[k]);
                    }
                    getProfilePicture(artistImg, gv, temp.length(),artist);
                }
                catch (Exception e){
                    Log.i(TAG,result.toString());
                }
            }
        });
    }
    //2
    public void getProfilePicture(String[] img, GridView gv, int length, String[][] name){
        Log.i(TAG,"getProfilePicture");
        gridCount = 0;
        String[] unique = new HashSet<String>(Arrays.asList(img)).toArray(new String[0]);
        for (int k = 0; k < unique.length; k++){
            Log.i(TAG,"unique length: " + img.length );
            Log.i(TAG,img[gridCount]);
            getImageReq("http://52.211.85.57:8080/api/image?type=users&image_name="+img[gridCount++],img[k],k, img, gv, length, name);
        }
    }
    //2
    public void getMusicAlbumsImages(String[] img, GridView gv, int length, String[][] name){
        Log.i(TAG,"getProfilePicture");
        gridCount = 0;
        String[] unique = new HashSet<String>(Arrays.asList(img)).toArray(new String[0]);
        for (int k = 0; k < unique.length; k++){
            Log.i(TAG,"unique length: " + img.length );
            Log.i(TAG,img[gridCount]);
            getImageReq("http://52.211.85.57:8080/api/image?type=albums&image_name="+img[gridCount++],img[k],k, img, gv, length, name);
        }
    }
    //2
    public void getAlbumArt(String[] img, GridView gv, int length, String[][] name){
        Log.i(TAG,"GetAlbumArt");
        gridCount = 0;
        String[] unique = new HashSet<String>(Arrays.asList(img)).toArray(new String[0]);
        for (int k = 0; k < unique.length; k++){
            Log.i(TAG,unique[gridCount]);
            getImageReq("http://52.211.85.57:8080/api/image?type=albums&image_name="+unique[gridCount++],unique[k],k, img, gv, length, name);
        }
    }
    //3
    private void getImageReq(String imageUrl,final String name, final int k, final String[] img, final GridView gv, final int length, final String[][] nameText){
        Log.i(TAG,"getImageReq");
        final serverLink sender = new serverLink(this);
        sender.getImage(imageUrl,new serverLink.OnDownloadCompleted() {
            @Override
            public void onTaskCompleted(Bitmap result, boolean error, String message) {
                try {
                    tempBitmap[k] = result;
                    setOtherImages(name, k, img, gv, length, nameText);
                }
                catch (Exception e){
                    Log.i(TAG,e.getMessage().toString());
                }
            }
        });
    }
    //4
    public void setOtherImages(String name, int k, String[] img, GridView gv, int length, String[][] nameText){
        Log.i(TAG,"setOtherImages");
        for(int l = 0; l<20; l++){
            if(name.equals(img[l])){
                albumImage[l] = Bitmap.createBitmap(tempBitmap[k]);
                Log.i(TAG,"l: " + l + "name: " + name  + " img: " + img[l] + " k: " + k);
            }
        }
        setGridView(gv, length, nameText);
    }
    //5
    private void setGridView(GridView gv,int length, String[][] name){
        Log.i(TAG,"setGridView");
        Adapter adapter = new Adapter(this,getAlbums(length,name));
        gv.setAdapter(adapter);
        loaded = true;
    }
    //6
    private ArrayList<Albums> getAlbums(int length, String[][] name)
    { Log.i(TAG,"getAlbums");
        ArrayList<Albums> albums = new ArrayList<Albums>();
        for (int i=0;i<length;i++)
        {
            albums.add(new Albums(name[i][0],albumImage[i]));
        }

        return  albums;
    }

    @Override
    public void onClick(View v){
        try {
            if (loaded){
                if(v.getId() == R.id.playmini){
                    if(paused){
                        mp.start();
                        play.setImageResource(R.drawable.pauseorange);
                    }
                    else{
                        mp.pause();
                        play.setImageResource(R.drawable.playorange);
                    }
                    paused = !paused;
                }
                else if (v.getId() == R.id.backmin){
                    if(!paused){
                        if(mp.getCurrentPosition() <= 0.5){
                            previousSong();
                        }
                        else{
                            mp.reset();
                        }
                    }
                }
                else if (v.getId() == R.id.imageView5){
                    if(!paused){
                        nextSong();
                    }
                }
                else if (v.getId() == R.id.currentplayingimg){
                    Intent intent = new Intent(new Intent(musicexplorer.this,musicplayer.class));
                    intent.putExtra("songPos",songPos);
                    intent.putExtra("token",token);
                    intent.putExtra("song",song[0]);
                    intent.putExtra("album",song[2]);
                    intent.putExtra("artist",song[1]);
                    startActivity(intent);
                }
            }
        }
        catch (Exception ex){
            Log.i("error: ",ex.getMessage().toString());
        }
    }

    public static void playSong(String url, Context context){
        try {
            if(mp != null){
                stopPlaying();
            }
            mp = new MediaPlayer(/*Your-Context*/);
            mp.setDataSource(url);
            mp.setOnPreparedListener(new MediaPlayer.OnPreparedListener(){
                @Override
                public void onPrepared(MediaPlayer mp)
                {
                    mp.start();
                }

            });
            mp.prepareAsync();
        } catch (Exception e) {
            Toast.makeText(context,e.getMessage().toString(),Toast.LENGTH_LONG);
        }

    }

    public void previousSong(){
        if (songPos>0){
            stopPlaying();
            sendSongRequest(songPos-1);
        }
    }

    public void nextSong(){
        if(songPos < 18){
            stopPlaying();
            sendSongRequest(songPos+1);
        }
    }

    public void sendSongRequest(int pos){
        if(mp!=null){
            stopPlaying();
        }
        imageView.setImageBitmap(albumImage[pos]);
        String songUrl = "http://52.211.85.57:8080/api/music?token=" + token + "&song=" + song[pos][0] + "&artist=" + song[pos][1] + "&album=" + song[pos][2];
        songUrl = songUrl.replaceAll(" ","%20");
        playSong(songUrl, this);
        songView.setText(song[pos][0]);
        artistView.setText(song[pos][1]);
        Log.i(TAG,songUrl);
        songPos = pos;
    }

    public static void sendSongRequest(int pos, String[] song, String[] artist, String[] album, String token, ImageView imageView, TextView songView, TextView artistView, Context context){
        if(mp!=null){
            stopPlaying();
        }
        imageView.setImageBitmap(albumImage[pos]);
        String songUrl = "http://52.211.85.57:8080/api/music?token=" + token + "&song=" + song[pos] + "&artist=" + artist[pos] + "&album=" + album[pos];
        songUrl = songUrl.replaceAll(" ","%20");
        playSong(songUrl, context);
        songView.setText(song[pos]);
        artistView.setText(artist[pos]);
        Log.i(TAG,songUrl);
    }

    public static void stopPlaying(){
        mp.stop();
        mp.release();
        mp = null;
    }

    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this)
                .setTitle("Really Exit?")
                .setMessage("Are you sure you want to exit?")
                .setNegativeButton(android.R.string.no, null)
                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {

                    public void onClick(DialogInterface arg0, int arg1) {
                        if(mp != null)
                            mp.stop();
                        musicexplorer.super.onBackPressed();
                    }
                }).create().show();
    }

}
