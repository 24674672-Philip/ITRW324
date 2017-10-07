package com.example.phili.rip_mobile;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.nfc.Tag;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TabLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TabHost;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.ImageLoader;
import com.android.volley.toolbox.ImageRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class musicexplorer extends AppCompatActivity  {

    private static final String TAG = "MyActivity";
    private ImageView imageView;
    private String[] name;
    private String[] img;
    private int[] images = {R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,
            R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,
            R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong,R.drawable.defaultsong};
    private TabHost mTabHost;
    private GridView gv1, gv2, gv3, gv4;
    private Context context;
    private Bitmap[] albumImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_musicexplorer);
        name = new String[20];
        img = new String[20];
        mTabHost = (TabHost)findViewById(R.id.tabHost);
        mTabHost.setup();
        imageView = (ImageView) findViewById(R.id.imageView5);
        albumImage = new Bitmap[20];

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


        gv1 = (GridView)findViewById(R.id.albumsgrid);
        gv2 = (GridView)findViewById(R.id.artistsgrid);
        gv3 = (GridView)findViewById(R.id.genresgrid);
        gv4 = (GridView)findViewById(R.id.songsgrid);

        sendGetSongs();

    }

    private ArrayList<Albums> getAlbums()
    {
        ArrayList<Albums> albums = new ArrayList<Albums>();
        for (int i=0;i<=13;i++)
        {
            albums.add(new Albums(name[i],albumImage[i]));
        }

        return  albums;
    }

    private void sendGetSongs(){

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
                        name[k] = temp.getJSONObject(k).getString("Title");
                        img[k] = temp.getJSONObject(k).getString("album_image");
                        getImageReq("http://52.211.85.57:8080/api/image?type=albums&image_name="+img[k],k);
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

}
