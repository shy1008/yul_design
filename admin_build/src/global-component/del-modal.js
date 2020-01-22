Vue.component('delte-modal', {
  props: ['tb'],
  template: "<div class=\"pop-window fade\" id=\"modal-del\">\n                <div class=\"alert\">\n                    <div class=\"alert_con\">\n                        <i class=\"material-icons red\">error_outline</i>\n                        <p>\uC815\uB9D0\uB85C \uC0AD\uC81C \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C? (\uC0AD\uC81C\uD6C4\uC5D4 \uBCF5\uAD6C\uAC00 \uBD88\uAC00\uB2A5\uD569\uB2C8\uB2E4)</p>\n                    </div>\n                    <div class=\"modal_foot\">\n                        <span v-on:click='GetData' class=\"b_red\">\uD655\uC778</span>\n                        <span v-on:click='ModalClose' class=\"b_sgrey\">\uCDE8\uC18C</span>\n                    </div>\n                </div>\n            </div>",
  data: function data() {
    return {
      idx: null,
      Data: null
    };
  },
  created: function created() {
    var _this = this;

    idx = null;
    eventBus.$on('bannerData', function (Data) {
      _this.Data = Data[0];
    });
  },
  methods: {
    ModalClose: function ModalClose() {
      var Modal = document.getElementById('modal-del');
      Modal.style.opacity = '0';
      setTimeout(function () {
        Modal.style.display = 'none';
      }, 100);
    },
    GetData: function GetData(a) {
      var _this2 = this;

      var baseURI = 'api/banner.api.php';
      axios.post(baseURI, {
        mode: "imgDelte",
        Data: this.Data
      }).then(function (result) {
        if (result.data.phpResult == 'ok') {
          eventBus.$emit('bannerDelteResult', "ok");

          _this2.ModalClose();
        } else {
          alert('실패하였습니다 (관리자에게 문의해주세요)');
        }
      }).catch(function (err) {
        return console.log('Login: ', err);
      }); // //idx 활용 데이터 삭제후 idx 초기화!
    }
  }
});