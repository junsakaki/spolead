/** セレクトボックス切り替え関数 **/
function set_menu_address_item(i_type, s_filename){
  if(s_filename != '0'){
    var o_xmlreq = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    var s_filepass = 'http://localhost/csv/' + s_filename + '.csv'; // 読み込むファイルのパスを指定
    o_xmlreq.open('get', s_filepass, true); // アクセスするファイルを指定
    o_xmlreq.send(null); // HTTPリクエスト発行
 
    // レスポンスが返ってきたら続きの処理を行う
    o_xmlreq.onload = function(){
      var a_pref = o_xmlreq.responseText.split("\r\n"); // 改行を区切り文字として行を要素とした配列を生成
 
      if(i_type == 0){
        // セレクトボックス初期化
        while ( document.getElementById('city').options.length > 0 ) {
          document.getElementById('city').removeChild(document.getElementById('city').firstChild);
        }
        while ( document.getElementById('town').options.length > 0 ) {
          document.getElementById('town').removeChild(document.getElementById('town').firstChild);
        }
        document.getElementById('city').options[0] = new Option('----','0');  //OPTION1番目
        document.getElementById('town').options[0] = new Option('----','0');  //OPTION1番目
        var i_check_index = 0;
        for( var i=1; i<a_pref.length; i++ ){
          // 各行ごとにカンマで区切った文字列を要素とした配列を生成
          var a_pref_disassembly = a_pref[i].split(',');
          if( a_pref_disassembly.length <= 1 ){
            continue;
          }
          var s_city_name = a_pref_disassembly[9].replace(/"/g, '');
          if(document.getElementById('city').options[i_check_index].text != s_city_name){
            document.getElementById('city').options[i_check_index + 1] = new Option(s_city_name,s_city_name);
            i_check_index++;
          }
        }
      } else {
        // セレクトボックス初期化
        while ( document.getElementById('town').options.length > 0 ) {
          document.getElementById('town').removeChild(document.getElementById('town').firstChild);
        }
        // 選択中の要素を抜き出す
        var s_selected_city_name = document.getElementById('city').value;
        document.getElementById('town').options[0] = new Option('----','0');  //OPTION1番目
        var i_check_index = 0;
        for( var i=1; i<a_pref.length; i++ ){
          // 各行ごとにカンマで区切った文字列を要素とした配列を生成
          var a_pref_disassembly = a_pref[i].split(',');
          if( a_pref_disassembly.length <= 1 ){
            continue;
          }
          var s_city_name = a_pref_disassembly[9].replace(/"/g, '');
          var s_town_name = a_pref_disassembly[11].replace(/"/g, '');
          if((s_selected_city_name == s_city_name) && ('　' != s_town_name) && (document.getElementById('town').options[i_check_index].text != s_town_name)){
            document.getElementById('town').options[i_check_index + 1] = new Option(s_town_name,s_town_name);
            i_check_index++;
          }
        }
      }
    }
  } else {
    // セレクトボックス初期化
    while ( document.getElementById('city').options.length > 0 ) {
      document.getElementById('city').removeChild(document.getElementById('city').firstChild);
    }
    while ( document.getElementById('town').options.length > 0 ) {
      document.getElementById('town').removeChild(document.getElementById('town').firstChild);
    }
    document.getElementById('city').options[0] = new Option('----','0');  //OPTION1番目
    document.getElementById('town').options[0] = new Option('----','0');  //OPTION1番目
  }
}
 
/** セレクトボックス入力チェック関数 **/
function selectbox_check(){
  if(document.getElementById('pref').selectedIndex == 0){
    window.alert('県名を選択してください。');
    return false;
  }
  if(document.getElementById('city').selectedIndex == 0){
    window.alert('市区町村名を選択してください。');
    return false;
  }
    return true;
}