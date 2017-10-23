package com.example.phili.rip_mobile;


import android.content.Context;
import android.graphics.Bitmap;
import android.media.MediaPlayer;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TabHost;
import android.widget.TabWidget;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;


public class Music_Browser extends Fragment {


    private TextView coins;
    public ConstraintLayout music_bar;
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

    public Music_Browser() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_music__browser, container, false);
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
        token = getActivity().getIntent().getExtras().getString("token");
        gridCount = 0;
        loadSong = false;
        loadArt = false;
        loadAlb = false;
        songPos = 0;


        coins = v.findViewById(R.id.tvCoins1);
        coins.setText(login.COINS);

        mTabHost = v.findViewById(R.id.tabHost);
        mTabHost.setup();


        music_bar = v.findViewById(R.id.musicplayermin);
        imageView =  v.findViewById(R.id.currentplayingimg);
        play =  v.findViewById(R.id.playmini);
        back =  v.findViewById(R.id.backmin);
        next =  v.findViewById(R.id.forwardmin);
        artistView =  v.findViewById(R.id.artistmin);
        songView =  v.findViewById(R.id.songmin);
        currPlay =  v.findViewById(R.id.currentplayingimg);


        play.setImageResource(R.drawable.btn_play);
        music_bar.setVisibility(ConstraintLayout.GONE);


     //   play.setOnClickListener(this);
     //  back.setOnClickListener(this);
     //   next.setOnClickListener(this);

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

        gv1 = (GridView)v.findViewById(R.id.albumsgrid);
        gv2 = (GridView)v.findViewById(R.id.artistsgrid);
        gv3 = (GridView)v.findViewById(R.id.songsgrid);

        gv3.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v,
                                    int position, long id) {
                if (loaded) {
                    sendSongRequest(position);
                }
            }
        });
        getMusicAlbums(gv1);


            if (isOnline() == true) {
                currPlay.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        getActivity().setTitle("Music Player");

                        Music_Player music_player = new Music_Player();
                        FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                        fragmentTransaction.replace(R.id.fragment_container, music_player).commit();
                        fragmentTransaction.addToBackStack(null);



                        getActivity().getIntent().putExtra("songPos", songPos);
                        getActivity().getIntent().putExtra("token", token);
                        getActivity().getIntent().putExtra("song", song[0]);
                        getActivity().getIntent().putExtra("album", song[2]);
                        getActivity().getIntent().putExtra("artist", song[1]);
                        //startActivity(getActivity().getIntent());
                    }
                });
                play.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        if (paused) {
                            mp.start();
                            play.setImageResource(R.drawable.btn_pause);
                        } else {
                            mp.pause();
                            play.setImageResource(R.drawable.btn_play);
                        }
                        paused = !paused;
                    }
                });

                back.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        if (!paused) {
                            if (mp.getCurrentPosition() <= 0.5) {
                                previousSong();
                            } else {
                                mp.reset();
                            }
                        }
                    }
                });

                next.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        if (!paused) {
                            nextSong();
                        }
                    }
                });

            } else {
                Toast.makeText(getActivity(), "You are not connected to Internet", Toast.LENGTH_LONG).show();
            }





        return v;}

//========================================================================================================================
    private void getSongs(final GridView gv){
        Log.i(TAG,"getSongs");
        String[] headersType = new String[1];
        String[] headersVal = new String[1];
        headersType[0] = "page";
        headersVal[0] = "0";

        final serverLink sender = new serverLink(getActivity());
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
//==========================================================================================================================
    private void getMusicAlbums(final GridView gv){
        Log.i(TAG,"getMusicAlbums");
        String[] headersType = new String[1];
        String[] headersVal = new String[1];
        headersType[0] = "page";
        headersVal[0] = "0";

        final serverLink sender = new serverLink(getActivity());
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
//==========================================================================================================================
private void getArtists(final GridView gv){
    Log.i(TAG,"getArtists");
    String[] headersType = new String[1];
    String[] headersVal = new String[1];
    headersType[0] = "page";
    headersVal[0] = "0";

    final serverLink sender = new serverLink(getActivity());
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
//==========================================================================================================================
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
// ==========================================================================================================================
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
//==========================================================================================================================
public void getAlbumArt(String[] img, GridView gv, int length, String[][] name){
    Log.i(TAG,"GetAlbumArt");
    gridCount = 0;
    String[] unique = new HashSet<String>(Arrays.asList(img)).toArray(new String[0]);
    for (int k = 0; k < unique.length; k++){
        Log.i(TAG,unique[gridCount]);
        getImageReq("http://52.211.85.57:8080/api/image?type=albums&image_name="+unique[gridCount++],unique[k],k, img, gv, length, name);
    }
}
//==========================================================================================================================
private void getImageReq(String imageUrl,final String name, final int k, final String[] img, final GridView gv, final int length, final String[][] nameText){
    Log.i(TAG,"getImageReq");
    final serverLink sender = new serverLink(getActivity());
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
//==========================================================================================================================
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
//==========================================================================================================================
private void setGridView(GridView gv,int length, String[][] name){
    Log.i(TAG,"setGridView");
    Adapter adapter = new Adapter(getActivity(),getAlbums(length,name));
    gv.setAdapter(adapter);
    loaded = true;
}
//==========================================================================================================================
private ArrayList<Albums> getAlbums(int length, String[][] name)
{ Log.i(TAG,"getAlbums");
    ArrayList<Albums> albums = new ArrayList<Albums>();
    for (int i=0;i<length;i++)
    {
        albums.add(new Albums(name[i][0],albumImage[i]));
    }

    return  albums;
}
//==========================================================================================================================
public void onClick(View v){
    try {
        if (loaded){
            if(v.getId() == R.id.playmini){
                if(paused){
                    mp.start();
                    play.setImageResource(R.drawable.btn_play);
                }
                else{
                    mp.pause();
                    play.setImageResource(R.drawable.btn_play);
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
            else if (v.getId() == R.id.forwardmin){
                if(!paused){
                    nextSong();
                }
            }
            else if (v.getId() == R.id.currentplayingimg){
                getActivity().setTitle("Music Player");
                Music_Player music_browser = new Music_Player();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                fragmentManager.beginTransaction().replace(R.id.fragment_container,music_browser).commit();
                getActivity().getIntent().putExtra("songPos",songPos);
                getActivity().getIntent().putExtra("token",token);
                getActivity().getIntent().putExtra("song",song[0]);
                getActivity().getIntent().putExtra("album",song[2]);
                getActivity().getIntent().putExtra("artist",song[1]);
                startActivity(getActivity().getIntent());
            }
        }
    }
    catch (Exception ex){
        Log.i("error: ",ex.getMessage().toString());
    }
}
//==========================================================================================================================
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
// ==========================================================================================================================
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

    public static void stopPlaying(){
        mp.stop();
        mp.release();
        mp = null;
    }

    // ==========================================================================================================================
public void sendSongRequest(int pos){
    if(mp!=null){
        stopPlaying();
    }
    imageView.setImageBitmap(albumImage[pos]);
    String songUrl = "http://52.211.85.57:8080/api/music?token=" + token + "&song=" + song[pos][0] + "&artist=" + song[pos][1] + "&album=" + song[pos][2];
    songUrl = songUrl.replaceAll(" ","%20");
    playSong(songUrl, getActivity());
    play.setImageResource(R.drawable.btn_pause);
    music_bar.setVisibility(ConstraintLayout.VISIBLE);
    songView.setText(song[pos][0]);
    artistView.setText(song[pos][1]);
    Log.i(TAG,songUrl);
    songPos = pos;
}
// ==========================================================================================================================
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
// ==========================================================================================================================
protected boolean isOnline() {

    ConnectivityManager cm = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);

    NetworkInfo netInfo = cm.getActiveNetworkInfo();

    if (netInfo != null && netInfo.isConnectedOrConnecting()) {

        return true;

    } else {

        return false;

    }

}
// ==========================================================================================================================
// ==========================================================================================================================
}
