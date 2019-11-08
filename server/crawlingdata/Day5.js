var cheerio = require('cheerio');
var request = require('request');
var url = 'http://www.ssaf.or.kr/html_kor/festival_time3.asp?day=03';

 
 // 함수를 실행시켜주었을 때의 위 변수들 값이 저장되어야 함. 배열, 객체 
var requestFn = () =>
     
    new Promise((resolve, reject) => {
    let result = {
      place: [],
      title: [],
      name: [],
      time: [],
      con_day: []
    };
    request(url, function(error, response, html){
    if (!error) {
        var $ = cheerio.load(html);
        for(var i = -2; i < 29;){
            $('.tit').each(function(){
            var place_info = $(this);
            var place_info_text = place_info.text();
            //console.log(place_info_text);
            //place[i] = place_info_text;
            result['place'][i] = place_info_text;
            i++;
        })
        }   
    
        for(var i = 0; i < 29;){
            $('.txt01 > a').each(function(){
            var title1_info = $(this);
            var title1_info_text = title1_info.text();
            //title1[i] = title1_info_text;
            result['title'][i] = title1_info_text;
            i++;
            })
        }
    
        for(var i = 0; i < 29;){
            $('.txt02').each(function(){
            var name_info = $(this);
            var name_info_text = name_info.text();
            //name[i] = name_info_text;
            result['name'][i] = name_info_text;
            i++;
            })
        }

        for(var i = 0; i < 29;){
            $('.time').each(function(){
            var time_info = $(this);
            var time_info_text = time_info.text();
            //time[i] = time_info_text;
            result['time'][i] = time_info_text;
            i++;
            })          
        }
        $('.date').each(function(){
            var con_day_info = $(this);
            var con_day_info_text = con_day_info.text();
            //con_day[0] = con_day_info_text;
            result['con_day'].push(con_day_info_text);
            })
        // for(var i = 1; i < 34; i++){
        //     console.log(i + " " + place[i - 1] + " - " + title1[i - 1] + name[i - 1] + time[i - 1]);
        // }
        //console.log(result.place.length);
        //console.log(result.con_day);
        resolve(result); 
    }
    });
});
    
    

module.exports = requestFn;