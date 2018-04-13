$(document).ready(() => {
  const repository = "https://github.com/yamaoka-kitaguchi-lab/members/";
  const members_url = "https://raw.githubusercontent.com/yamaoka-kitaguchi-lab/members/master/members.json";
  const past_students_url = "https://raw.githubusercontent.com/yamaoka-kitaguchi-lab/members/master/past_students.json";
  const past_exchange_students_url = "https://raw.githubusercontent.com/yamaoka-kitaguchi-lab/members/master/past_exchange_students.json";

  const build_members_list = (json) => {
    const thead = (group) => {
      const label = group['label'];
      return $('<thead>')
        .append($('<tr>')
          .append($('<th>').text(label['grade']['ja']))
          .append($('<th>').text(label['grade']['en']))
          .append($('<th>').text(label['name']['ja']))
          .append($('<th>').text(label['name']['en']))
          .append($('<th>').text(label['room']['ja'] + ' ' + label['room']['en']))
          .append($('<th>').text(label['account']['ja'] + ' ' + label['account']['en'])));
    };

    const tbody = (group) => {
      const members = group['members'];
      var tbody = $('<tbody>')
      for (var idx in members) {
        const member = members[idx];
        var name_ja = member['name']['ja'];
        var name_en = member['name']['en'];
        if (member['url'] != undefined) {
          name_ja = $('<a href="' + member['url'] + '">').text(name_ja);
          name_en = $('<a href="' + member['url'] + '">').text(name_en);
        }
        tbody.append($('<tr>')
          .append($('<td>').text(member['grade']['ja']))
          .append($('<td>').text(member['grade']['en']))
          .append($('<td>').append(name_ja))
          .append($('<td>').append(name_en))
          .append($('<td>').text(member['room']))
          .append($('<td>').text(member['account'])));
      }
      return tbody;
    };

    for (var idx in json) {
      const group = json[idx];
      const heading = group['role']['ja'] + " " + group['role']['en'];
      $("#members")
        .append($('<h3>').text(heading))
        .append($('<small class="no-margin info">')
          .append($('<span class="glyphicon glyphicon-envelope">'))
          .append("account@net.ict.e.titech.ac.jp"))
        .append($('<div class="table-responsive panel panel-body">')
          .append($('<table class="table">')
            .append(thead(group))
            .append(tbody(group))));
    }
  };

  const build_past_students_list = (json) => {
    const thead = (group) => {
      const label = group['label'];
      return $('<thead>')
        .append($('<tr>')
          .append($('<th>').text(label['date']['ja']))
          .append($('<th>').text(label['date']['en']))
          .append($('<th>').text(label['name']['ja']))
          .append($('<th>').text(label['name']['en']))
          .append($('<th>').text(label['degree']['ja']))
          .append($('<th>').text(label['degree']['en'])));
    };

    const tbody = (group) => {
      const members = group['members'];
      var tbody = $('<tbody>')
      for (var idx in members) {
        const member = members[idx];
        var name_ja = member['name']['ja'];
        var name_en = member['name']['en'];
        if (member['url'] != undefined) {
          name_ja = $('<a href="' + member['url'] + '">').text(name_ja);
          name_en = $('<a href="' + member['url'] + '">').text(name_en);
        }
        tbody.append($('<tr>')
          .append($('<td>').text(member['date']['ja']))
          .append($('<td>').text(member['date']['en']))
          .append($('<td>').append(name_ja))
          .append($('<td>').append(name_en))
          .append($('<td>').text(member['degree']['ja']))
          .append($('<td>').text(member['degree']['en'])));
      }
      return tbody;
    };

    for (var idx in json) {
      const group = json[idx];
      const heading = group['role']['ja'] + " " + group['role']['en'];
      $("#pastmembers")
        .append($('<h3>').text(heading))
        .append($('<div class="table-responsive panel panel-body">')
          .append($('<table class="table">')
            .append(thead(group))
            .append(tbody(group))));
    }
  };

  const build_past_exchange_students_list = (json) => {
    const thead = (group) => {
      const label = group['label'];
      return $('<thead>')
        .append($('<tr>')
          .append($('<th>').text(label['period']['ja']))
          .append($('<th>').text(label['period']['en']))
          .append($('<th>').text(label['name']['ja']))
          .append($('<th>').text(label['name']['en']))
          .append($('<th>').text(label['affiliation']['en']))
          .append($('<th>').text(label['program']['en'])));
    };

    const tbody = (group) => {
      const members = group['members'];
      var tbody = $('<tbody>')
      for (var idx in members) {
        const member = members[idx];
        var name_ja = member['name']['ja'];
        var name_en = member['name']['en'];
        if (member['url'] != undefined) {
          name_ja = $('<a href="' + member['url'] + '">').text(name_ja);
          name_en = $('<a href="' + member['url'] + '">').text(name_en);
        }
        tbody.append($('<tr>')
          .append($('<td>').text(member['period']['ja']))
          .append($('<td>').text(member['period']['en']))
          .append($('<td>').append(name_ja))
          .append($('<td>').append(name_en))
          .append($('<td>').append(members['affiliation']['en']))
          .append($('<td>').append(members['program']['en'])));
      }
      return tbody;
    };

    for (var idx in json) {
      const group = json[idx];
      const heading = group['role']['ja'] + " " + group['role']['en'];
      $("#pastmembers")
        .append($('<div class="table-responsive panel panel-body">')
          .append($('<table class="table">')
            .append(thead(group))
            .append(tbody(group))));
    }
  };

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

  $("#erroralert").empty();
  fetch_and_build(members_url, build_members_list);
  fetch_and_build(past_students_url, build_past_students_list);
  // fetch_and_build(past_exchange_students_url, build_past_exchange_students_list);
});
