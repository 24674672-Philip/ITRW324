package com.example.phili.rip_mobile;

import android.content.Context;
import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.MediaController;
import android.widget.ProgressBar;
import android.widget.SeekBar;
import android.widget.TextView;

import org.w3c.dom.Text;

public class main extends AppCompatActivity implements View.OnClickListener ,MediaPlayer.OnPreparedListener{

    Button btnPlay, btnPause;
    TextView tvReturn;
    Context contxt;
    SeekBar sBar;
    MediaPlayer mp;
    private double startTime = 0;
    private double finalTime = 0;
    public static int oneTimeOnly = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnPlay = (Button) findViewById(R.id.btnPlay);
        btnPause = (Button) findViewById(R.id.btnPause);
        tvReturn = (TextView) findViewById(R.id.tvReturn);
        sBar = (SeekBar) findViewById(R.id.seekBar);
        contxt = this;
        sBar.setClickable(false);

        btnPause.setOnClickListener(this);
        btnPlay.setOnClickListener(this);

        sendMusicRequest();
    }

    private void sendMusicRequest(){
        try {
            mp = new MediaPlayer(/*Your-Context*/);
            mp.setDataSource("http://52.211.85.57:8080/api/music?song=new%20divide");
            mp.setOnPreparedListener(new MediaPlayer.OnPreparedListener(){
                @Override
                public void onPrepared(MediaPlayer mp)
                {
                    mp.start();

                    finalTime = mp.getDuration();
                    startTime = mp.getCurrentPosition();

                    if (oneTimeOnly == 0) {
                        sBar.setMax((int) finalTime);
                        oneTimeOnly = 1;
                    }
                    sBar.setProgress((int)startTime);
                }
            });
            mp.prepareAsync();
        } catch (Exception e) {
            tvReturn.setText(e.getMessage());
        }
    }

    @Override
    public void onPrepared(MediaPlayer mp)
    {
        mp.start();
    }

    @Override
    public void onClick(View v){
        if(v.getId()==R.id.btnPlay){
            mp.start();
        }
        else if(v.getId()==R.id.btnPause){
            mp.pause();
        }
    }
}
