console.log(
  '%c???「僕と契約して、net-rootになってよ！」\n%c> contract.sign()',
  'font-weight: bold; font-size: large', ''
);

const contract = {
  sign: () => {
    const mailto = 'mailto:q@net.ict.e.titech.ac.jp';
    const subject = 'net-root承認のお願い'
    var body = [
      '（net-rootとして何をやりたいのか説明してください）',
      '',
      'net-rootにはフルスタックで業務が降ってきます',
      '・ネットワークの構築と運用（VLANとRIPくらい？かんたん）',
      '・サーバの構築と運用（Linux，Ansible，Docker/Kubernetes，PaaSなど．IaC大切に）',
      '・Webアプリケーションの開発と運用（Ruby，Python，NodeJSなど）',
    ];
    body = body.join(encodeURIComponent("\r\n"));
    location.href = mailto + '?subject=' + subject + '&body=' + body;
  }
};
