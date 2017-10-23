package com.example.phili.rip_mobile;
/**
 * Created by tcjvr on 2017/10/07.
 */

public class CartDetails {

    String title, artist, price;

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

    public String getPrice() {
        return price;
    }

    public void setPrice(String duration) {
        this.price = duration;
    }

    public CartDetails(String title, String artist, String duration )
    {

        this.title = title;
        this.artist =artist;
        this.price = duration;

    }
}
