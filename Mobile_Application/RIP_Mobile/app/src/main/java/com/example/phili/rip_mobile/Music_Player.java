package com.example.phili.rip_mobile;


import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.TextView;


public class Music_Player extends Fragment {

    private String[] songArr, artistArr, albumArr;
    private int songPos;
    private String token;
    private ImageView imageView;
    private TextView artistView, songView, timebar;
    private SeekBar mSeekBar;
    private Handler mHandler = new Handler();

    public Music_Player() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View v =  inflater.inflate(R.layout.fragment_music__player, container, false);

        try{
            token = getActivity().getIntent().getExtras().getString("token");
            songArr = getActivity().getIntent().getExtras().getStringArray("song");
            albumArr = getActivity().getIntent().getExtras().getStringArray("album");
            artistArr = getActivity().getIntent().getExtras().getStringArray("artist");
            songPos = getActivity().getIntent().getExtras().getInt("songPos");
            Log.i("musicplayer: ","gets");
            imageView = (ImageView) v.findViewById(R.id.albumart);
            artistView = (TextView) v.findViewById(R.id.txtArtist);
            songView = (TextView) v.findViewById(R.id.txtSong);
            timebar = (TextView) v.findViewById(R.id.timeBar);
            mSeekBar = (SeekBar) v.findViewById(R.id.seekBar);
            Log.i("musicplayer: ","Init");

            imageView.setImageBitmap(Music_Browser.albumImage[songPos]);
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
                    if(Music_Browser.mp != null && fromUser){
                        Music_Browser.mp.seekTo(progress * 1000);
                    }
                }
            });

            final int duration = Music_Browser.mp.getDuration();
            final int amoungToupdate = duration / 1000;
            Log.i("amoungToupdate: ", "" + amoungToupdate);
            final int initPos = Music_Browser.mp.getCurrentPosition();
            mSeekBar.setProgress((initPos/duration)*100);
            mSeekBar.setMax(amoungToupdate);
            Log.i("amoungToupdate: ", "" + ((initPos/duration)*100));
            //Make sure you update Seekbar on UI thread
            this.getActivity().runOnUiThread(new Runnable() {

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

        return v;

    }
    public String getTimer(){
        int secondsL = (Music_Browser.mp.getCurrentPosition() / 1000) % 60;
        int minL = (Music_Browser.mp.getCurrentPosition() / 60000);

        int secondsR = (Music_Browser.mp.getDuration() / 1000) % 60;
        int minR = (Music_Browser.mp.getDuration() / 60000);

        String timer = "" + minL + ":" + secondsL + "/" + minR + ":" + secondsR;//("%.2d/%.2d",,(double)musicexplorer.mp.getDuration()/60000);
        return  timer;
    }

}
