package com.example.phili.rip_mobile;

import android.graphics.Bitmap;

/**
 * Created by tcjvr on 2017/10/04.
 */

public class Albums {
    private String name;
    private Bitmap img;

    public Albums(String n, Bitmap img) {
        setImg(img);
        setName(n);
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Bitmap getImg() {
        return img;
    }

    public void setImg(Bitmap img) {
        this.img = img;
    }


}
