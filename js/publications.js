$(document).ready(() => {
  const repository = "https://github.com/yamaoka-kitaguchi-lab/publications/";
  const baseurl = "https://raw.githubusercontent.com/yamaoka-kitaguchi-lab/publications/master";

  const fetch_and_build = (url, builder, builderargs) => {
    const filename = url.split('/')[url.split('/').length-1];
    $("#erroralert")
      .append($('<div id="' + builder.name + '" class="alert alert-info">')
        .append($('<strong>')
          .append($('<span class="spinner-border spinner-border-sm text-info mr-2">'))
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
            .append($('<i class="fas fa-fire pr-2"></i>'))
            .append(title)
            .append($('<strong>').text(cause)))
          .append($('<p class="mb-0">')
            .append($('<a href="' + url + '">').text(filename))
            .append(" に問題があります．<br>GitHubリポジトリ ")
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
          .append($('<th class="p-2 border-top-0">').text(label['id']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['degree']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['name']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['title']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['supervisor']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['previous']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['tag']['ja'])));
      const tbody = $('<tbody>');
      for (var student of json['students']) {
        const title = $('<a href="' + student['url'] + '">').text(student['title']['ja']);
        const tag = $('<td class="p-2">')
        for (var item of student['tag']) {
          tag.append($('<span class="badge badge-primary mr-1">').text(item['ja']));
        }
        tbody.append($('<tr>')
          .append($('<td class="p-2">').text(student['id']))
          .append($('<td class="p-2">').text(student['degree']['ja']))
          .append($('<td class="p-2">').text(student['name']['ja']))
          .append($('<td class="p-2">').append(title))
          .append($('<td class="p-2">').text(student['supervisor']['ja']))
          .append($('<td class="p-2">').text(student['previous']['ja']))
          .append(tag));
      }
      const table = $('<div class="table-responsive card card-body p-3 mt-3">')
        .append($('<table class="table mb-0">')
          .append(thead)
          .append(tbody));
      args['parent'].append(args['header']).append(table);
    };

    const build_conference_table = (json, args) => {
      const label = json['label'];
      const thead = $('<thead>')
        .append($('<tr>')
          .append($('<th class="p-2 border-top-0">').text(label['id']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['name']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['title']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['conference']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['coresearcher']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['location']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['date']['ja'])));
      const tbody = $('<tbody>');
      for (var student of json['students']) {
        const title = $('<a href="' + student['url'] + '">');
        if (student['title']['ja'] != '') title.text(student['title']['ja']);
        else title.text(student['title']['en']);
        const coresearcher = $('<td class="p-2">');
        for (var person of student['coresearcher']) {
          coresearcher.append($('<span class="badge badge-success mr-1">').text(person['ja']));
        }
        tbody.append($('<tr>')
          .append($('<td class="p-2">').text(student['id']))
          .append($('<td class="p-2">').text(student['name']['ja']))
          .append($('<td class="p-2">').append(title))
          .append($('<td class="p-2">').text(student['conference']['ja']))
          .append(coresearcher)
          .append($('<td class="p-2">').text(student['location']['ja']))
          .append($('<td class="p-2">').text(student['date']['ja'])));
      }
      const table = $('<div class="table-responsive card card-body p-3 mt-3">')
        .append($('<table class="table mb-0">')
          .append(thead)
          .append(tbody));
      args['parent'].append(args['header']).append(table);
    };

    const build_journal_table = (json, args) => {
      const label = json['label'];
      const thead = $('<thead>')
        .append($('<tr>')
          .append($('<th class="p-2 border-top-0">').text(label['id']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['name']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['title']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['journal']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['coresearcher']['ja']))
          .append($('<th class="p-2 border-top-0">').text(label['vol']['en']))
          .append($('<th class="p-2 border-top-0">').text(label['no']['en']))
          .append($('<th class="p-2 border-top-0">').text(label['pp']['en']))
          .append($('<th class="p-2 border-top-0">').text(label['date']['ja'])));
      const tbody = $('<tbody>');
      for (var student of json['students']) {
        const title = $('<a href="' + student['url'] + '">');
        if (student['title']['ja'] != '') title.text(student['title']['ja']);
        else title.text(student['title']['en']);
        const coresearcher = $('<td class="p-2">');
        for (var person of student['coresearcher']) {
          coresearcher.append($('<span class="badge badge-success mr-1">').text(person['ja']));
        }
        tbody.append($('<tr>')
          .append($('<td class="p-2">').text(student['id']))
          .append($('<td class="p-2">').text(student['name']['ja']))
          .append($('<td class="p-2">').append(title))
          .append($('<td class="p-2">').text(student['journal']['ja']))
          .append(coresearcher)
          .append($('<td class="p-2">').text(student['vol']))
          .append($('<td class="p-2">').text(student['no']))
          .append($('<td class="p-2">').text(student['pp']))
          .append($('<td class="p-2">').text(student['date']['ja'])));
      }
      const table = $('<div class="table-responsive card card-body p-3 mt-3">')
        .append($('<table class="table mb-0">')
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
      const header = $('<h3>').text(year + '年度');
      const div = $('<div>');
      tabpane.append(div);
      fetch_and_build(jsonurl, jsonbuilder, {'parent': div, 'header': header});
    }
    tabcontent.append(tabpane);
  };

  const build_publications_list = (index, _) => {
    const tabbar = $('<ul id="tabbar" class="nav nav-pills nav-justified mt-4">');
    const tabcontent = $('<div id="tabcontent" class="tab-content">');
    const tabidlst = ["degree", "domestic", "international", "journal"];
    for (var tabid of tabidlst) {
      const label = index['label'][tabid];
      const tabname = label['ja'] + " " + label['en'];
      const yearlst = index['publications'][tabid];
      tabbar.append($('<li class="nav-item">')
        .append($('<a class="nav-link" href="#' + tabid + '" data-toggle="pill">').text(tabname)
          .append('<span id="badge-' + tabid + '" class="badge">')));
      build_tab_content(tabid, yearlst, tabcontent);
    }
    $("#publications").append(tabbar);
    $("#publications").append(tabcontent);
    $("#tabbar li:first-child a").addClass("active");
    $("#tabcontent div:first-child").addClass("active");
  };

  const indexurl = baseurl + "/" + "index.json";
  $("#erroralert").empty();
  fetch_and_build(indexurl, build_publications_list, null);
});
