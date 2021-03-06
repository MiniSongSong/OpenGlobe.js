/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/defineProperties'],function(defineProperties){
   'use strict';

    var Color = function(r, g, b, a){
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    };

    Color.FromArgb = function(a, r, g, b){
        return new Color(r,g,b,a);
    };

    Color.FromRgba = function(r, g, b, a){
        return new Color(r,g,b,a);
    };

    Color.White = function(){
        return new Color(1.0,1.0,1.0,1.0);
    };

    Color.Black = function(){
        return new Color(0.0,0.0,0.0,1.0);
    };

    Color.Equals = function(left, right){
        if(left.R != right.R){
            return false;
        }
        if(left.G != right.G){
            return false;
        }
        if(left.B != right.B){
            return false;
        }
        if(left.A != right.A){
            return false;
        }

        return true;
    };

    defineProperties(Color.prototype,{
        R : {
            get : function(){
                return this._r;
            },
            set : function(x){
                this._r = x;
            }
        },

        G : {
            get : function(){
                return this._g;
            },
            set : function(x){
                this._g = x;
            }
        },

        B : {
            get : function(){
                return this._b;
            },
            set : function(x){
                this._b = x;
            }
        },

        A : {
            get : function(){
                return this._a;
            },
            set : function(x){
                this._a = x;
            }
        }
    });

    return Color;
});