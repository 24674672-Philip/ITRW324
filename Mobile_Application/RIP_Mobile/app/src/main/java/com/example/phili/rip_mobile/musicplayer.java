package com.example.phili.rip_mobile;

import android.graphics.Bitmap;
import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

public class musicplayer extends AppCompatActivity {

    private MediaPlayer mediaPlayer;
    private String[] songArr, artistArr, albumArr;
    private double startTime = 0;
    private double finalTime = 0;
    private int oneTimeOnly = 0;
    private boolean paused = false;
    private int songPos;
    private String token;
    private ImageView imageView;
    private TextView artistView, songView, timebar;
    private Bitmap[] albumImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_musicplayer2);
        Gson gson = new Gson();

        /*String mpString = getIntent().getExtras().getString("mp");
        token = getIntent().getExtras().getString("token");
        mediaPlayer = gson.fromJson(mpString, MediaPlayer.class);
        mediaPlayer.start();
        String bitmapString = getIntent().getExtras().getString("mp");
        albumImage = gson.fromJson(bitmapString,Bitmap[].class);*/
        //songArr = getIntent().getExtras().getStringArray("song");
        //artistArr = getIntent().getExtras().getStringArray("artist");
        //albumArr = getIntent().getExtras().getStringArray("album");
        songPos = getIntent().getExtras().getInt("songPos");
        startTime = getIntent().getExtras().getInt("currentPos");
        finalTime = getIntent().getExtras().getInt("length");

        imageView = (ImageView) findViewById(R.id.albumart);
        artistView = (TextView) findViewById(R.id.txtArtist);
        songView = (TextView) findViewById(R.id.txtSong);
        timebar = (TextView) findViewById(R.id.timeBar);

        timebar.setText("" + startTime + "/" + finalTime);
        //artistView.setText(artistArr[songPos]);
        //songView.setText(songArr[songPos]);

    }

    public void playSong(String url){
        try {
            if(mediaPlayer != null){
                stopPlaying();
            }
            paused = false;
            mediaPlayer = new MediaPlayer(/*Your-Context*/);
            mediaPlayer.setDataSource(url);
            mediaPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener(){
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
            mediaPlayer.prepareAsync();
        } catch (Exception e) {
            Toast.makeText(this,e.getMessage().toString(),Toast.LENGTH_LONG);
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
        if(mediaPlayer!=null){
            stopPlaying();
        }
        imageView.setImageBitmap(albumImage[pos]);
        String songUrl = "http://52.211.85.57:8080/api/music?token=" + token + "&song=" + songArr[pos] + "&artist=" + artistArr[pos] + "&album=" + albumArr[pos];
        songUrl = songUrl.replaceAll(" ","%20");
        playSong(songUrl);
        songView.setText(songArr[pos]);
        artistView.setText(artistArr[pos]);
        Log.i("My activity: ",songUrl);
        songPos = pos;
    }

    public void stopPlaying(){
        mediaPlayer.stop();
        mediaPlayer.release();
        mediaPlayer = null;
    }
}
