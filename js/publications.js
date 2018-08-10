$(document).ready(() => {
  const repository = "https://github.com/yamaoka-kitaguchi-lab/publications/";
  const baseurl = "https://raw.githubusercontent.com/yamaoka-kitaguchi-lab/publications/master";

  const fetch_and_build = (url, builder, builderargs) => {
    const filename = url.split('/')[url.split('/').length-1];
    $("#erroralert")
      .append($('<div id="' + builder.name + '" class="alert alert-info">')
        .append($('<strong>')
          .append($('<span class="glyphicon glyphicon-cog">'))
          .append("ビルド中: "))
        .append($('<a href="' + url + '">').text(filename)))
    $.getJSON(url)
    .done((data) => {
      builder(data, builderargs);
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
            .append($('<a href="' + repository + '">').text("yamaoka-kitaguchi-lab/publications"))
            .append(" を確認してください．")));
      console.error(error);
    })
  };

  const build_tab_content = (tabid, yearlst, tabcontent) => {
    const build_degree_table = (json, args) => {
      const label = json['label'];
      const thead = $('<thead>')
        .append($('<tr>')
          .append($('<th>').text(label['id']['ja']))
          .append($('<th>').text(label['degree']['ja']))
          .append($('<th>').text(label['name']['ja']))
          .append($('<th>').text(label['title']['ja']))
          .append($('<th>').text(label['supervisor']['ja']))
          .append($('<th>').text(label['previous']['ja']))
          .append($('<th>').text(label['tag']['ja'])));
      const tbody = $('<tbody>');
      for (var student of json['students']) {
        const title = $('<a href="' + student['url'] + '">').text(student['title']['ja']);
        const tag = $('<td>')
        for (var item of student['tag']) {
          tag.append($('<span class="label label-primary category-tag-item tag-item">').text(item['ja']));
        }
        tbody.append($('<tr>')
          .append($('<td>').text(student['id']))
          .append($('<td>').text(student['degree']['ja']))
          .append($('<td>').text(student['name']['ja']))
          .append($('<td>').append(title))
          .append($('<td>').text(student['supervisor']['ja']))
          .append($('<td>').text(student['previous']['ja']))
          .append(tag));
      }
      const table = $('<div class="table-responsive panel panel-body">')
        .append($('<table class="table">')
          .append(thead)
          .append(tbody));
      args['parent'].append(args['header']).append(table);
    };

    const build_conference_table = (json, args) => {
      const label = json['label'];
      const thead = $('<thead>')
        .append($('<tr>')
          .append($('<th>').text(label['id']['ja']))
          .append($('<th>').text(label['name']['ja']))
          .append($('<th>').text(label['title']['ja']))
          .append($('<th>').text(label['conference']['ja']))
          .append($('<th>').text(label['coresearcher']['ja']))
          .append($('<th>').text(label['location']['ja']))
          .append($('<th>').text(label['date']['ja'])));
      const tbody = $('<tbody>');
      for (var student of json['students']) {
        const title = $('<a href="' + student['url'] + '">');
        if (student['title']['ja'] != '') title.text(student['title']['ja']);
        else title.text(student['title']['en']);
        const coresearcher = $('<td>');
        for (var person of student['coresearcher']) {
          coresearcher.append($('<span class="label label-success category-tag-item tag-item">').text(person['ja']));
        }
        tbody.append($('<tr>')
          .append($('<td>').text(student['id']))
          .append($('<td>').text(student['name']['ja']))
          .append($('<td>').append(title))
          .append($('<td>').text(student['conference']['ja']))
          .append(coresearcher)
          .append($('<td>').text(student['location']['ja']))
          .append($('<td>').text(student['date']['ja'])));
      }
      const table = $('<div class="table-responsive panel panel-body">')
        .append($('<table class="table">')
          .append(thead)
          .append(tbody));
      args['parent'].append(args['header']).append(table);
    };

    const build_journal_table = (json, args) => {
      const label = json['label'];
      const thead = $('<thead>')
        .append($('<tr>')
          .append($('<th>').text(label['id']['ja']))
          .append($('<th>').text(label['name']['ja']))
          .append($('<th>').text(label['title']['ja']))
          .append($('<th>').text(label['journal']['ja']))
          .append($('<th>').text(label['coresearcher']['ja']))
          .append($('<th>').text(label['vol']['en']))
          .append($('<th>').text(label['no']['en']))
          .append($('<th>').text(label['pp']['en']))
          .append($('<th>').text(label['date']['ja'])));
      const tbody = $('<tbody>');
      for (var student of json['students']) {
        const title = $('<a href="' + student['url'] + '">');
        if (student['title']['ja'] != '') title.text(student['title']['ja']);
        else title.text(student['title']['en']);
        const coresearcher = $('<td>');
        for (var person of student['coresearcher']) {
          coresearcher.append($('<span class="label label-success category-tag-item tag-item">').text(person['ja']));
        }
        tbody.append($('<tr>')
          .append($('<td>').text(student['id']))
          .append($('<td>').text(student['name']['ja']))
          .append($('<td>').append(title))
          .append($('<td>').text(student['journal']['ja']))
          .append(coresearcher)
          .append($('<td>').text(student['vol']))
          .append($('<td>').text(student['no']))
          .append($('<td>').text(student['pp']))
          .append($('<td>').text(student['date']['ja'])));
      }
      const table = $('<div class="table-responsive panel panel-body">')
        .append($('<table class="table">')
          .append(thead)
          .append(tbody));
      args['parent'].append(args['header']).append(table);
    };

    const tabpane = $('<div class="tab-pane" id="' + tabid + '">');
    switch (tabid) {
      case 'degree':
        var jsonbuilder = build_degree_table;
        break;
      case 'domestic': case 'international':
        var jsonbuilder = build_conference_table;
        break;
      case 'journal':
        var jsonbuilder = build_journal_table;
        break;
    }
    for (year of yearlst) {
      const jsonurl = baseurl + '/' + tabid + '/' + tabid + '_' + year + '.json';
      const header = $('<h3>').text(year);
      const div = $('<div>');
      tabpane.append(div);
      fetch_and_build(jsonurl, jsonbuilder, {'parent': div, 'header': header});
    }
    tabcontent.append(tabpane);
  };

  const build_publications_list = (index, _) => {
    const tabbar = $('<ul id="tabbar" class="nav nav-pills nav-justified">');
    const tabcontent = $('<div id="tabcontent" class="tab-content">');
    const tabidlst = ["degree", "domestic", "international", "journal"];
    for (var tabid of tabidlst) {
      const label = index['label'][tabid];
      const tabname = label['ja'] + " " + label['en'];
      const yearlst = index['publications'][tabid];
      tabbar.append($('<li>')
        .append($('<a href="#' + tabid + '" data-toggle="pill">').text(tabname)
          .append('<span id="badge-' + tabid + '" class="badge">')));
      build_tab_content(tabid, yearlst, tabcontent);
    }
    $("#publications").append(tabbar);
    $("#publications").append(tabcontent);
    $("#tabbar li:first-child").addClass("active");
    $("#tabcontent div:first-child").addClass("active");
  };

  const indexurl = baseurl + "/" + "index.json";
  $("#erroralert").empty();
  fetch_and_build(indexurl, build_publications_list, null);
});
