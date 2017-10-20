package com.example.phili.rip_mobile;

import android.util.Log;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by phili on 17-Oct-17.
 */

public class HashClass {

    public String md5(String s) {
        try {
            // Create MD5 Hash
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(s.getBytes());

            byte byteData[] = md.digest();

            //convert the byte to hex format
            StringBuffer hexString = new StringBuffer();
            for (int i=0;i<byteData.length;i++) {
                String hex=Integer.toHexString(0xff & byteData[i]);
                if(hex.length()==1) hexString.append('0');
                hexString.append(hex);
            }
            //Log.i("hash","Digest(in hex format):: " + hexString.toString());
            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            Log.i("Hashclass", e.getMessage().toString());
        }
        return "";
    }

}
