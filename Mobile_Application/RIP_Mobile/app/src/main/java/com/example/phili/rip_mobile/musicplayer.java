package com.example.phili.rip_mobile;

import android.graphics.Bitmap;
import android.media.MediaPlayer;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class musicplayer extends AppCompatActivity {

    private String[] songArr, artistArr, albumArr;
    private int songPos;
    private String token;
    private ImageView imageView;
    private TextView artistView, songView, timebar;
    private SeekBar mSeekBar;
    private Handler mHandler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_musicplayer2);

        try{
            token = getIntent().getExtras().getString("token");
            songArr = getIntent().getExtras().getStringArray("song");
            albumArr = getIntent().getExtras().getStringArray("album");
            artistArr = getIntent().getExtras().getStringArray("artist");
            songPos = getIntent().getExtras().getInt("songPos");
            Log.i("musicplayer: ","gets");
            imageView = (ImageView) findViewById(R.id.albumart);
            artistView = (TextView) findViewById(R.id.txtArtist);
            songView = (TextView) findViewById(R.id.txtSong);
            timebar = (TextView) findViewById(R.id.timeBar);
            mSeekBar = (SeekBar) findViewById(R.id.seekBar);
            Log.i("musicplayer: ","Init");

            imageView.setImageBitmap(musicexplorer.albumImage[songPos]);
            artistView.setText(artistArr[songPos]);
            songView.setText(songArr[songPos]);

            mSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {

                @Override
                public void onStopTrackingTouch(SeekBar seekBar) {

                }

                @Override
                public void onStartTrackingTouch(SeekBar seekBar) {

                }

                @Override
                public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                    if(musicexplorer.mp != null && fromUser){
                        musicexplorer.mp.seekTo(progress * 1000);
                    }
                }
            });

            final int duration = musicexplorer.mp.getDuration();
            final int amoungToupdate = duration / 1000;
            Log.i("amoungToupdate: ", "" + amoungToupdate);
            final int initPos = musicexplorer.mp.getCurrentPosition();
            mSeekBar.setProgress((initPos/duration)*100);
            mSeekBar.setMax(amoungToupdate);
            Log.i("amoungToupdate: ", "" + ((initPos/duration)*100));
            //Make sure you update Seekbar on UI thread
            musicplayer.this.runOnUiThread(new Runnable() {

                @Override
                public void run() {
                    if (!(amoungToupdate * mSeekBar.getProgress() >= duration)) {
                        int p = mSeekBar.getProgress();
                        p += 1;
                        timebar.setText(getTimer());
                        mSeekBar.setProgress(p);
                        Log.i("Seekbar: ", "" + p);
                    }
                    mHandler.postDelayed(this, 1000);
                }
            });


        }
        catch (Exception ex){
            Log.i("ERROR, musicplayer: ",ex.getMessage().toString());
        }

    }

    public String getTimer(){
        int secondsL = (musicexplorer.mp.getCurrentPosition() / 1000) % 60;
        int minL = (musicexplorer.mp.getCurrentPosition() / 60000);

        int secondsR = (musicexplorer.mp.getDuration() / 1000) % 60;
        int minR = (musicexplorer.mp.getDuration() / 60000);

        String timer = "" + minL + ":" + secondsL + "/" + minR + ":" + secondsR;//("%.2d/%.2d",,(double)musicexplorer.mp.getDuration()/60000);
        return  timer;
    }

}
