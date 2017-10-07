package com.example.phili.rip_mobile;
/**
 * Created by tcjvr on 2017/10/07.
 */

public class SongDetails {

    String title, artist,duration;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public SongDetails(String title, String artist, String duration )
    {

        this.title = title;
        this.artist =artist;
        this.duration = duration;

    }
}
