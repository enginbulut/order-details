export default {
  formatMoney: amount => {
    var delimiter = ".";
    var a = amount.split(".", 2);
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) {
      return "";
    }
    var minus = "";
    if (i < 0) {
      minus = "-";
    }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
      var nn = n.substr(n.length - 3);
      a.unshift(nn);
      n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
      a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
      amount = n;
    } else {
      amount = n + "," + d;
    }
    amount = minus + amount;
    return amount;
  },
  printMoneyAsWords: amount => {
    const moneyParts = amount.split(",");
    const liraPart = moneyParts[0];
    const kurusPart = moneyParts[1];
    let final = "";

    const pronounce = {
      figure: {
        1: "bir",
        2: "iki",
        3: "üç",
        4: "dört",
        5: "beş",
        6: "altı",
        7: "yedi",
        8: "sekiz",
        9: "dokuz"
      },
      number: {
        1: "on",
        2: "yirmi",
        3: "otuz",
        4: "kırk",
        5: "elli",
        6: "altmış",
        7: "yetmiş",
        8: "seksen",
        9: "doksan"
      },
      step: {
        0: "",
        1: "bin",
        2: "milyon",
        3: "milyar",
        4: "trilyon",
        5: "katrilyon",
        6: "kentilyon"
      }
    };

    const divideLiras = liraPart.split(".");
    for (let i = 0; i < divideLiras.length; i++) {
      let number = divideLiras[i];
      let partsOfNumber = number.split("");

      if (partsOfNumber.length === 3) {
        if (partsOfNumber[0] !== "0") {
          if (partsOfNumber[0] !== "1")
            final += " " + pronounce.figure[partsOfNumber[0]];
          final += " yüz";
        }
        if (partsOfNumber[1] !== "0") {
          final += " " + pronounce.number[partsOfNumber[1]];
        }
        if (partsOfNumber[2] !== "0") {
          final += " " + pronounce.figure[partsOfNumber[2]];
        }
      }

      if (partsOfNumber.length === 2) {
        if (partsOfNumber[0] !== "0") {
          final += " " + pronounce.number[partsOfNumber[0]];
        }
        if (partsOfNumber[1] !== "0") {
          final += " " + pronounce.figure[partsOfNumber[1]];
        }
      }

      if (partsOfNumber.length === 1) {
        if (partsOfNumber[0] !== "0" && divideLiras.length - i - 1 !== 1) {
          final += " " + pronounce.figure[partsOfNumber[0]];
        }
      }

      final += " " + pronounce.step[divideLiras.length - i - 1];
    }

    final += " lira";

    if (kurusPart.length > 0) {
      let partsOfKurus = kurusPart.split("");

      if (partsOfKurus[0] !== "0") {
        final += " " + pronounce.number[partsOfKurus[0]];
      }
      if (partsOfKurus[1] !== "0") {
        final += " " + pronounce.figure[partsOfKurus[1]];
      }
      final += " kuruş";
    }
    return final.trim();
  }
};
