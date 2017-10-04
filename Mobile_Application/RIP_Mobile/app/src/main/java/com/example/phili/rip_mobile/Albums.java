package com.example.phili.rip_mobile;

/**
 * Created by tcjvr on 2017/10/04.
 */

public class Albums {
    private String name;
    private int img;

    public Albums(String n, int img) {
        this.img = img;
        this.name = n;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getImg() {
        return img;
    }

    public void setImg(int img) {
        this.img = img;
    }


}
