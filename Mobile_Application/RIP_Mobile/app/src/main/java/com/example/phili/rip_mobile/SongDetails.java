package com.example.phili.rip_mobile;
/**
 * Created by tcjvr on 2017/10/07.
 */

public class SongDetails {

    String title;
    String artist;
    String duration;


    String album;

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

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;

    }
    public SongDetails(String title, String artist, String album, String duration)
    {

        this.title = title;
        this.artist = artist;
        this.duration = duration;
        this.album = album;

    }
}