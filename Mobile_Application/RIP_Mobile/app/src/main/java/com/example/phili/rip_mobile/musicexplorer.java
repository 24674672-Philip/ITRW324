package com.example.phili.rip_mobile;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;

public class musicexplorer extends AppCompatActivity implements View.OnClickListener{

    private static final String TAG = "MyActivity";
    private String[][] name;
    private String[] img;
    private int[] images = {R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,
            R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,
            R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong};
    private TabHost mTabHost;
    private GridView gv1, gv2, gv3, gv4;
    private Context context;
    private Bitmap[] albumImage;
    private boolean loaded, paused;
    private MediaPlayer mp;
    private double startTime = 0;
    private double finalTime = 0;
    public static int oneTimeOnly = 0;
    private String token, currentSong;
    private ImageView play, next, back, imageView;
    private TextView artistView, songView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_musicexplorer);
        name = new String[20][3];
        img = new String[20];
        albumImage = new Bitmap[20];
        loaded = false;
        paused = false;
        token = getIntent().getExtras().getString("token");
        currentSong = null;

        mTabHost = (TabHost)findViewById(R.id.tabHost);
        mTabHost.setup();

        imageView = (ImageView) findViewById(R.id.currentplayingimg);
        play = (ImageView) findViewById(R.id.playmini);
        back = (ImageView) findViewById(R.id.backmin);
        next = (ImageView) findViewById(R.id.imageView5);
        artistView = (TextView) findViewById(R.id.artistmin);
        songView = (TextView) findViewById(R.id.songmin);

        play.setOnClickListener(this);
        back.setOnClickListener(this);
        next.setOnClickListener(this);

        TabHost.TabSpec spec;

        context = this;

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


        mTabHost.setOnClickListener(this);

        gv1 = (GridView)findViewById(R.id.albumsgrid);
        gv2 = (GridView)findViewById(R.id.artistsgrid);
        gv3 = (GridView)findViewById(R.id.genresgrid);
        gv4 = (GridView)findViewById(R.id.songsgrid);



        gv1.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v,
                                    int position, long id) {
                if (loaded) {
                    imageView.setImageBitmap(albumImage[position]);
                    String songUrl = "http://52.211.85.57:8080/api/music?token=" + token + "&song=" + name[position][0] + "&artist=" + name[position][1] + "&album=" + name[position][2];
                    songUrl = songUrl.replaceAll(" ","%20");
                    playSong(songUrl);
                    songView.setText(name[position][0]);
                    artistView.setText(name[position][1]);
                    Log.i(TAG,songUrl);
                }
            }
        });
        sendGetItems("songs");

    }

    private ArrayList<Albums> getAlbums()
    {
        ArrayList<Albums> albums = new ArrayList<Albums>();
        for (int i=0;i<20;i++)
        {
            albums.add(new Albums(name[i][0],albumImage[i]));
        }

        return  albums;
    }

    private void sendGetItems(String type){

        String[] headersType = new String[1];
        String[] headersVal = new String[1];
        headersType[0] = "page";
        headersVal[0] = "0";

        final serverLink sender = new serverLink(this);
        sender.sendServerRequest(headersType, headersVal, (type.equals("songs"))?"/api/getsongs":"/api/getalbums", true,new serverLink.OnDownloadTaskCompleted() {
            @Override
            public void onTaskCompleted(JSONObject result, boolean error, String message) {
                try {
                    JSONArray temp = result.getJSONArray("result");
                    for (int k = 0; k<temp.length(); k++){
                        Log.i(TAG,"" + k + ": " + temp.getJSONObject(k).toString());
                        name[k][0] = temp.getJSONObject(k).getString("Title");
                        name[k][1] = temp.getJSONObject(k).getString("Artist");
                        name[k][2] = temp.getJSONObject(k).getString("Album");
                        img[k] = temp.getJSONObject(k).getString("album_image");

                        if(k>0||k==19){
                            if(name[k][0].equals(name[k-1][0])&&k!=19){
                                albumImage[k] = Bitmap.createBitmap(albumImage[k-1]);
                            }
                            else{
                                getImageReq("http://52.211.85.57:8080/api/image?type=albums&image_name="+img[k],k);
                            }
                        }
                        else{
                            getImageReq("http://52.211.85.57:8080/api/image?type=albums&image_name="+img[k],k);
                        }
                    }
                }
                catch (Exception e){
                    Log.i(TAG,result.toString());
                }
            }
        });
    }

    private void setGridView(){
        Adapter adapter = new Adapter(this,getAlbums());
        gv1.setAdapter(adapter);
        loaded = true;
    }

    private void getImageReq(String imageUrl,final int k){

        final serverLink sender = new serverLink(this);
        sender.getImage(imageUrl,new serverLink.OnDownloadCompleted() {
            @Override
            public void onTaskCompleted(Bitmap result, boolean error, String message) {
                try {
                    albumImage[k] = result;
                    if (k == 19){
                        setGridView();
                    }
                }
                catch (Exception e){
                    Log.i(TAG,message);
                }
            }
        });
    }

    @Override
    public void onClick(View v){
        if (loaded){
            if(v.getId() == R.id.playmini){
                if(paused){
                    mp.start();
                }
                else{
                    mp.pause();
                }
                paused = !paused;
            }
            else if (v.getId() == R.id.backmin){

            }
            else if (v.getId() == R.id.imageView5){

            }
            else if (v.getId() == R.id.tabHost){

            }
        }
    }

    public void playSong(String url){
        try {
            if(mp != null){
                mp.stop();
            }
            mp = new MediaPlayer(/*Your-Context*/);
            mp.setDataSource(url);
            mp.setOnPreparedListener(new MediaPlayer.OnPreparedListener(){
                @Override
                public void onPrepared(MediaPlayer mp)
                {
                    mp.start();

                    finalTime = mp.getDuration();
                    startTime = mp.getCurrentPosition();

                    if (oneTimeOnly == 0) {
                        //sBar.setMax((int) finalTime);
                        oneTimeOnly = 1;
                    }
                    //sBar.setProgress((int)startTime);
                }
            });
            mp.prepareAsync();
        } catch (Exception e) {
            Toast.makeText(this,e.getMessage().toString(),Toast.LENGTH_LONG);
        }

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
