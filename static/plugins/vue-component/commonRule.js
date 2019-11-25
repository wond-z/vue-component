const isEmpty = (value) => {
    if (value === undefined) {
        return true;
    }

    return typeof value === "string" && value.trim() === "";
};

const rules={
    NotEmpty: {
        required: true,
        validator: (rule, value, callback) => {

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            callback();
        },
        trigger: "blur"
    }, // 不能为空

  dm:{
    required: true,
    validator: (rule, value, callback) => {

      if (isEmpty(value)) {
        return callback(new Error("内容不能为空"));
      }
      // (?![0-9]+$)(?![a-zA-Z]+$)
      if (!(/^[0-9A-Za-z]{1,9}$/.test(value))) {
        callback(new Error("代码最多9位"));
      }

      callback();
    },
    trigger: "blur"
  },

  jedm:{
    required: true,
    validator: (rule, value, callback) => {

      if (isEmpty(value)) {
        return callback(new Error("内容不能为空"));
      }
      // (?![0-9]+$)(?![a-zA-Z]+$)
      if (!(/^[0-9]{9}$/.test(value))) {
        callback(new Error("代码格式不正确，应为9位数字组成"));
      }

      callback();
    },
    trigger: "blur"
  },

  miyao: {
    required: true,
    validator: (rule, value, callback) => {

      if (isEmpty(value)) {
        return callback(new Error("内容不能为空"));
      }
      // (?![0-9]+$)(?![a-zA-Z]+$)
      if (!(/^[0-9A-Za-z]{16}$/.test(value))) {
        callback(new Error("密钥位数不正确"));
      }

      callback();
    },
    trigger: "blur"
  }, // 密钥

    SelectRule: {
        required: true,
        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("必须选择其中一项"));
            }

            callback();
        },
        trigger: "change"
    }, // 必须选择
    MustBeNumber: {

        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!(/^[0-9]*$/.test(value))) {
                callback(new Error("请输入数字"));
            }

            callback();
        },
        trigger: "blur"
    }, // 必须是数字
    DateRule: {
        required: true,
        validator: (rule, value, callback) => {
            if (value === undefined || value === 0) {
                callback(new Error("请选择日期"));
            }

            callback();
        },
        trigger: "change"
    }, // 日期规则

  bankCar:{
    required: true,
    validator: (rule, value, callback) => {
      const macRegularExpression = /^([1-9]{1})(\d{14}|\d{18})$/;

      if (isEmpty(value)) {
        return callback(new Error("内容不能为空"));
      }

      if (!(/^[0-9]*$/.test(value))) {
      return callback(new Error("请输入数字"));
      }

      if (!macRegularExpression.test(value)) {
        callback(new Error("请输入正确的银行卡号码"));
      }
      callback();
    },
    trigger: "blur"
  },
  //银行卡验证规则
    MacRule: {
        required: true,
        validator: (rule, value, callback) => {
            const macRegularExpression = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!macRegularExpression.test(value)) {
                callback(new Error("请输入合法的MAC地址"));
            }

            callback();
        },
        trigger: "blur"
    }, // mac地址规则 
    IpRule: {
        required: true,
        validator: (rule, value, callback) => {
            const ipRegularExpression = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!ipRegularExpression.test(value)) {
                callback(new Error("请输入合法的ip地址"));
            }

            callback();
        },
        trigger: "blur"
    }, // mac地址规则
    LongitudeRule: {
        required: true,
        validator: (rule, value, callback) => {
            const ipRegularExpression = /^-?(?:(?:180(?:\.0{1,8})?)|(?:(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d{1,8})?))$/;

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!ipRegularExpression.test(value)) {
                callback(new Error("-180.0～+180.0，小数点后至多6位"));
            }

            callback();
        },
        trigger: "blur"
    }, // 经度规则
    LatitudeRule: {
        required: true,
        validator: (rule, value, callback) => {
            const ipRegularExpression = /^-?(?:90(?:\.0{1,6})?|(?:[1-8]?\d(?:\.\d{1,6})?))$/;

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!ipRegularExpression.test(value)) {
                callback(new Error("-90.0～+90.0，小数点后至多6位"));
            }

            callback();
        },
        trigger: "blur"
    }, // 纬度规则
    phoneRule: {
        required: true,
        validator: (rule, value, callback) => {
            const phoneRegularExpression = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!phoneRegularExpression.test(value)) {
                callback(new Error("请输入合法的手机号码"));
            }

            callback();
        },
        trigger: "blur"
    }, // 手机号码规则
  emailRule: {
    required: true,
    validator: (rule, value, callback) => {
      const emailRegularExpression = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (isEmpty(value)) {
        return callback(new Error("内容不能为空"));
      }

      if (!emailRegularExpression.test(value)) {
        callback(new Error("请输入合法的邮箱"));
      }

      callback();
    },
    trigger: "blur"
  },//邮箱验证规则
  passwordRule: {
    required: true,
    validator: (rule, value, callback) => {
      // const passwordRegularExpression = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,20}$/ ;
      if (isEmpty(value)) {
        return callback(new Error("内容不能为空"));
      }
      //
      // if (!passwordRegularExpression.test(value)) {
      //   callback(new Error("请输入8-20位中英文_组成的密码"));
      // }

      callback();
    },
    trigger: "blur"
  },//验证密码8-20 由数字字母下划线组成
  percentRule: {
    required: true,
    validator: (rule, value, callback) => {
      const percentRegularExpression = /^(100|[1-9]\d|\d)$/;
      if (isEmpty(value)) {
        return callback(new Error("内容不能为空"));
      }

      if (!percentRegularExpression.test(value)) {
        callback(new Error("请输入0-100的整数"));
      }
      callback();
    },
    trigger: "blur"
  },//验证0-100的整型百分数
  dollarRule: {
    required: true,
    validator: (rule, value, callback) => {
      const dollarRegularExpression = /^\d+$/;
      if (isEmpty(value)) {
        return callback(new Error("内容不能为空"));
      }

      if (!dollarRegularExpression.test(value)) {
        callback(new Error("请输入整数"));
      }
      callback();
    },
    trigger: "blur"
  },//验证整数美金

};
