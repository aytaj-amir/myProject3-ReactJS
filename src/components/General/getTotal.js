import React from "react";

export default function getFavoriteCompareBasketTotal  (){
    /**/
    const s_storage=window.localStorage,
        array_name1=s_storage.getItem('favorite_ids'),
        old_data1=JSON.parse(array_name1),
        array_name2=s_storage.getItem('compare_ids'),
        old_data2=JSON.parse(array_name2),
        array_name=s_storage.getItem('user_cart'),
        old_data=JSON.parse(array_name);

    var favorite_total=0,
        compare_total=0,
        basket_total=0;

    //fav total
    if (old_data1){
        for(let key in old_data1){
            favorite_total+=1
        }
    }

    //compare total
    if (old_data2){
        for(let key in old_data2){

            compare_total+=1
        }
    }

    //cart total
    if (old_data){
        for(let key in old_data){
            let row=old_data[key];

            basket_total+=row
        }
    }

    return {
        favorite_total : favorite_total, compare_total : compare_total, basket_total : basket_total
    }
};
