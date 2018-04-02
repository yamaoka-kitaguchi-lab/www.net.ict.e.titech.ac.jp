$(document).ready(() => {
  const repository = "https://github.com/yamaoka-kitaguchi-lab/publications/";
  const index_url = "https://raw.githubusercontent.com/yamaoka-kitaguchi-lab/publications/master/index.json";

  const fetch_and_build = (url, builder) => {
    const filename = url.split('/')[url.split('/').length-1];
    $("#erroralert")
      .append($('<div id="' + builder.name + '" class="alert alert-info">')
        .append($('<strong>')
          .append($('<span class="glyphicon glyphicon-cog">'))
          .append("ビルド中: "))
        .append($('<a href="' + url + '">').text(filename)))
    $.getJSON(url)
    .done((data) => {
      builder(data);
      $("#" + builder.name).remove();
    })
    .fail((jqxhr, textStatus, error) => {
      if (error === "") {
        error = "Unknown";
      }
      var title, cause, message, alerttype;
      const code = jqxhr['status'];
      if (code != 200) {
        title = "必要なJSONファイルの取得に失敗しました: ";
        cause = "HTTP " + code + " (" + error + ")";
      } else {
        title = "ビルドに失敗しました: ";
        cause = error;
      }
      $("#" + builder.name).remove();
      $("#erroralert")
        .append($('<div class="alert alert-danger">')
          .append($('<h4>')
            .append($('<span class="glyphicon glyphicon-fire">'))
            .append(title)
            .append($('<strong>').text(cause)))
          .append($('<p>')
            .append($('<a href="' + url + '">').text(filename))
            .append(" に問題があります．GitHubリポジトリ ")
            .append($('<a href="' + repository + '">').text("yamaoka-kitaguchi-lab/members"))
            .append(" を確認してください．")));
      console.error(error);
    })
  };

  const build_publications_list = (index) => {
    console.log(index);
    const build_tab = (pub, yearlst) => {
    }

    const tabbar = $('<ul id="tabbar" class="nav nav-pills">');
    const tabcontent = $('<div id="tabcontent" class="tab-content">');
    const publst = ["degree", "domestic", "international", "journal"];

    for (var idx in publist) {
      const tabid = publst[idx];
      const tabname = index['label']['ja'] + " " + index['label']['en'];
      tabbar.append($('<li>').append($('<a href="#' + tabid + '" data-toggle="pill">').text(tabname)));
      tabcontent.append(build_content(tabid, yearlst));
    }

    $("#publications").append(tabbar);
    $("#publications").append(tabcontent);
    $("#tabbar li:first-child").addClass("active");
    $("#tabcontent li:first-child").addClass("active");
  };

  $("#erroralert").empty();
  // fetch_and_build(index_url, build_publications_list);
});
