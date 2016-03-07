(function() {
    function isMobile() {
        var a = navigator.userAgent || navigator.vendor || window.opera;
        if (/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            return true;
        } else {
            return false
        }
    }

    function isSupportedMobile() {
        var r = new RegExp('iPhone OS [4-9]|Android (1\.[6-9]|[2-9]\.[2-9])|Fennec|iPad; U; CPU OS [4-9]', 'i');
        return r.test(navigator.userAgent);
    }

    function confirmDownload() {
        var allowing = document.cookie.match(/_textarfont=[01]/);

        if (allowing) {
            allowing = allowing[0].slice(-1);
        }

        if (!allowing && isSupportedMobile()) {
            var lang = navigator.language || navigator.browserLanguage;

            if (lang.indexOf('ja') > -1) {
                var msg = 'AA表示可能なフォントが見つかりませんでした。\n' +
                    'ウェブフォントをダウンロードしてもよろしいですか？';
            } else {
                var msg = 'Fonts for Shift_JIS art are not found.\n' +
                    'Are you sure to download a webfont?';
            }

            allowing = confirm(msg);
            (allowing) ? document.cookie = '_textarfont=1;path=/;': document.cookie = '_textarfont=0;path=/;';
            return allowing;
        } else if (allowing == '0') {
            return false;
        } else if (allowing == '1') {
            return true;
        } else if (isMobile()) {
            return false;
        } else {
            return true;
        }
    }

    function detectFontsAvailable(fontFamilies) {
        var parentElem = document.getElementsByTagName("html")[0];
        var elem = document.createElement("span");
        elem.style.visibility = "hidden";
        elem.style.position = "absolute";
        elem.style.top = "-10000px";
        elem.style.left = "-10000px";
        elem.style.fontFamily = "__FAKEFONT__";
        elem.style.fontSize = "32px";
        elem.innerHTML = "abcdefghijklmnopqrstuvwxyz";
        parentElem.appendChild(elem);
        var defaultWidth = elem.offsetWidth;
        var defaultHeight = elem.offsetHeight;
        var result = false;

        for (i = 0; i < fontFamilies.length; i++) {
            elem.style.fontFamily = fontFamilies[i];
            result |= (elem.offsetWidth != defaultWidth || elem.offsetHeight != defaultHeight);
        }

        parentElem.removeChild(elem);
        return result;
    }

    function addCSS(uri) {
        var link = document.createElement('link');
        link.href = uri;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    addCSS("data:text/css," + encodeURIComponent(
        ".textar-aa{font-family:'Textar','MS PGothic','IPAMonaPGothic','Mona',sans-serif;" +
        "font-size:16px;line-height:1.125;white-space:nowrap;" +
        "-webkit-text-size-adjust:none;}"));

    if (!detectFontsAvailable(['Textar', 'MS PGothic', 'IPAMonaPGothic', 'Mona']) && confirmDownload()) {
        addCSS('/textar-font/textar-font.css');
    }
})();