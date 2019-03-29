$(document).ready(() => {
  const latlng = new google.maps.LatLng(35.603178, 139.683943);
  const icon = new google.maps.MarkerImage(
    "/image/titech-favicn.ico",
    new google.maps.Size(32,32),
    new google.maps.Point(0, 0)
  );
  const map = new google.maps.Map($("#ggmap")[0], {
    zoom: 18,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  const marker = new google.maps.Marker({
    position: latlng,
    map: map,
  });
  const info = new google.maps.InfoWindow();
  info.setContent(
    '<div style="float: left; width: 130px; height: 150px;">'+
      '<img style=" height: 110px; display: block; margin-top: 20px; margin-right: 10px;" src="/image/titech-logo.jpg">' +
    '</div>' +
    '<div style="float: right; width: 240px; height: 160px;">'+
      '<p class="m-0" style="font-size:18px">山岡・北口研究室 (S3-301)</p>' +
      '<p class="m-0" style="font-size:14px">〒 152-8552</p>' +
      '<p class="m-0" style="font-size:14px">東京都目黒区大岡山 2-12-1-S3-68</p>' +
      '<p class="m-0" style="font-size:14px">南3号館3階301室</p>' +
      '<p class="m-0" style="font-size:14px">TEL <a href="tel:03-5734-3763">03-5734-3763</a> (山岡研)</p>' +
      '<p class="m-0" style="font-size:14px">TEL <a href="tel:03-5734-3354">03-5734-3354</a> (北口研)</p>' +
      '<p class="mt-2 mb-0 text-right" style="font-size:11px"><a href="https://www.google.com/maps?daddr=35.603178,139.683943&dirflg=r">ここへの経路を検索</a></p>' +
    '</div>'
  );
  google.maps.event.addListener(marker, "click", () => {
    info.open(map, marker);
  });
  if (window.outerWidth > 767) {
    info.open(map, marker); // default open
  }
});
