import type { AnalysisResult } from "@/lib/types";

// Five real-world scam patterns, pre-loaded with cached analyses.
// This is the stage-demo safety net: judges can see full verdicts instantly
// even with no API key or network. Each can also be re-run live.

export interface LibraryEntry {
  id: string;
  title: { en: string; zh: string };
  message: string;
  cached: AnalysisResult;
}

export const SCAM_LIBRARY: LibraryEntry[] = [
  {
    id: "parcel",
    title: { en: "Parcel delivery scam", zh: "包裹快递骗局" },
    message:
      "SingPost: Your parcel SP-88291 could not be delivered due to unpaid customs fee of $2.99. Pay within 24 hours or the parcel will be returned: http://sgpost-redeliver.top/pay",
    cached: {
      verdict: "danger",
      confidence: 97,
      scamType: { en: "Parcel delivery scam", zh: "包裹快递骗局" },
      headline: {
        en: "This is a fake delivery message trying to steal your card details.",
        zh: "这是一条假冒快递的信息，目的是盗取您的银行卡资料。",
      },
      tactics: [
        {
          name: { en: "Fake urgency", zh: "制造紧迫感" },
          explanation: {
            en: "It says you must pay within 24 hours. Scammers rush you so you act before you think. Real companies do not give such short deadlines.",
            zh: "它说必须在24小时内付款。骗子催您快点行动，让您来不及思考。正规公司不会给这么短的期限。",
          },
        },
        {
          name: { en: "Company impersonation", zh: "冒充公司" },
          explanation: {
            en: "It pretends to be SingPost, but the link is not the real SingPost website. Always check: real SingPost links end with singpost.com.",
            zh: "它假装是新加坡邮政，但链接不是官方网站。请记住：真正的新邮政网址以 singpost.com 结尾。",
          },
        },
        {
          name: { en: "Small fee trick", zh: "小额费用陷阱" },
          explanation: {
            en: "It only asks for $2.99 so it feels harmless. The real goal is to capture your card number on the fake payment page.",
            zh: "它只要求2.99元，让您觉得没什么。真正目的是在假付款页面偷走您的银行卡号。",
          },
        },
      ],
      advice: [
        {
          en: "Do not click the link or enter any card details.",
          zh: "不要点击链接，不要输入任何银行卡资料。",
        },
        {
          en: "If you are expecting a parcel, check directly on the official SingPost app or website.",
          zh: "如果您在等包裹，请直接用官方的新邮政App或网站查询。",
        },
        {
          en: "Delete the message and block the sender.",
          zh: "删除这条信息并拉黑发件人。",
        },
      ],
    },
  },
  {
    id: "govt",
    title: { en: "Fake government / police call", zh: "假冒政府或警察" },
    message:
      "This is Inspector Tan from the Singapore Police Force. Your bank account is involved in a money laundering case. To prove your innocence you must transfer your savings to a safe government account today. Do not tell your family, the investigation is confidential.",
    cached: {
      verdict: "danger",
      confidence: 99,
      scamType: { en: "Government impersonation scam", zh: "假冒政府骗局" },
      headline: {
        en: "This is a fake police call. Real police never ask you to transfer money.",
        zh: "这是假冒警察的电话。真警察绝不会叫您转账。",
      },
      tactics: [
        {
          name: { en: "Authority impersonation", zh: "冒充权威" },
          explanation: {
            en: "The caller pretends to be police to scare you into obeying. Real police will never call to demand money transfers.",
            zh: "对方冒充警察吓唬您，让您服从。真警察绝不会打电话要求您转账。",
          },
        },
        {
          name: { en: "Secrecy pressure", zh: "要求保密" },
          explanation: {
            en: '"Do not tell your family" is the biggest red flag. Scammers isolate you because your family would spot the scam immediately.',
            zh: "“不要告诉家人”是最大的危险信号。骗子要孤立您，因为家人一听就会识破骗局。",
          },
        },
        {
          name: { en: "Fear of false accusation", zh: "用罪名恐吓" },
          explanation: {
            en: "Being accused of a crime makes people panic. Scammers use fear so you stop thinking clearly.",
            zh: "被指控犯罪会让人惊慌。骗子利用恐惧让您无法冷静思考。",
          },
        },
        {
          name: { en: '"Safe account" trick', zh: "“安全账户”陷阱" },
          explanation: {
            en: "There is no such thing as a government safe account. Any request to move money to one is always a scam.",
            zh: "根本不存在所谓的政府安全账户。凡是叫您把钱转入“安全账户”的都是骗局。",
          },
        },
      ],
      advice: [
        { en: "Hang up immediately. Do not transfer anything.", zh: "立即挂断电话，什么都不要转。" },
        {
          en: "Call the police hotline 1800-255-0000 yourself to verify.",
          zh: "自己拨打警方热线 1800-255-0000 核实。",
        },
        { en: "Tell your family right away — never keep it secret.", zh: "马上告诉家人，绝不保密。" },
      ],
    },
  },
  {
    id: "romance",
    title: { en: "Romance scam", zh: "网络爱情骗局" },
    message:
      "My dearest, these three months talking to you have been the happiest of my life. I want to fly to see you next week, but my company has frozen my account over a contract issue. Could you lend me $3,800 for the lawyer? I will pay you back the moment I arrive, my love.",
    cached: {
      verdict: "danger",
      confidence: 95,
      scamType: { en: "Romance scam", zh: "网络爱情骗局" },
      headline: {
        en: "This is a romance scam. The 'lover' asks for money and will never arrive.",
        zh: "这是爱情骗局。“爱人”跟您要钱，但永远不会出现。",
      },
      tactics: [
        {
          name: { en: "Manufactured affection", zh: "假装深情" },
          explanation: {
            en: "Weeks of sweet messages build trust before any money is mentioned. The love story is the setup, the loan request is the goal.",
            zh: "先用几个星期的甜言蜜语建立信任，然后才提钱。恋爱是铺垫，借钱才是目的。",
          },
        },
        {
          name: { en: "Emergency just before meeting", zh: "见面前突发急事" },
          explanation: {
            en: "A crisis always appears right before you would finally meet. This keeps the fantasy alive while extracting money.",
            zh: "每次快要见面时就会出现“紧急情况”。这样既能骗钱，又能继续吊着您。",
          },
        },
        {
          name: { en: "Promise to repay", zh: "承诺还钱" },
          explanation: {
            en: "The promise to pay you back makes the request feel like a loan, not a gift. You will never see the money again.",
            zh: "承诺还钱让您觉得只是借款。其实这笔钱永远拿不回来。",
          },
        },
      ],
      advice: [
        { en: "Do not send money to someone you have never met in person.", zh: "绝不给没见过面的人汇款。" },
        {
          en: "Ask a family member to look at the conversation together with you.",
          zh: "请家人和您一起看看聊天记录。",
        },
        {
          en: "Try a video call — scammers always have excuses to refuse.",
          zh: "要求视频通话——骗子总会找借口拒绝。",
        },
      ],
    },
  },
  {
    id: "phishing",
    title: { en: "Bank phishing SMS", zh: "银行钓鱼短信" },
    message:
      "DBS Alert: Unusual sign-in detected on your account. Your access will be suspended in 2 hours. Verify your identity now at https://dbs-secure-verify.com and enter your OTP to keep your account active.",
    cached: {
      verdict: "danger",
      confidence: 98,
      scamType: { en: "Bank phishing", zh: "银行钓鱼骗局" },
      headline: {
        en: "This is a fake bank message built to steal your login and OTP.",
        zh: "这是假冒银行的信息，目的是盗取您的登录密码和验证码。",
      },
      tactics: [
        {
          name: { en: "Fake urgency", zh: "制造紧迫感" },
          explanation: {
            en: '"Suspended in 2 hours" pushes you to act fast. Banks do not suspend accounts by SMS countdown.',
            zh: "“2小时后冻结”逼您赶快行动。银行不会用短信倒计时冻结账户。",
          },
        },
        {
          name: { en: "Look-alike website", zh: "假冒网站" },
          explanation: {
            en: "dbs-secure-verify.com looks official but is not the bank's real address. Real DBS pages are on dbs.com.sg.",
            zh: "dbs-secure-verify.com 看起来很像官方，其实不是。星展银行的真网址是 dbs.com.sg。",
          },
        },
        {
          name: { en: "Asking for your OTP", zh: "索要验证码" },
          explanation: {
            en: "The OTP is the key to your account. Banks never ask you to enter an OTP through a link in a message. Anyone who asks for it is stealing it.",
            zh: "验证码就是您账户的钥匙。银行绝不会让您通过短信链接输入验证码。跟您要验证码的都是骗子。",
          },
        },
      ],
      advice: [
        { en: "Do not click the link. Do not enter your OTP anywhere.", zh: "不要点链接，不要在任何地方输入验证码。" },
        {
          en: "Open your bank's official app directly to check your account.",
          zh: "直接打开银行官方App查看账户。",
        },
        {
          en: "Report the message to your bank's official hotline.",
          zh: "拨打银行官方热线举报这条信息。",
        },
      ],
    },
  },
  {
    id: "investment",
    title: { en: "Investment scam", zh: "投资理财骗局" },
    message:
      "Uncle, I made $12,000 last month with this gold trading platform, guaranteed 15% returns weekly with zero risk! My mentor Ms Lily can open a VIP account for you. Just start with $500 and watch it grow. Slots close tonight!",
    cached: {
      verdict: "danger",
      confidence: 96,
      scamType: { en: "Investment scam", zh: "投资理财骗局" },
      headline: {
        en: "This 'guaranteed returns' investment is a scam. Your money will disappear.",
        zh: "这个“保证收益”的投资是骗局。您的钱会有去无回。",
      },
      tactics: [
        {
          name: { en: "Too good to be true", zh: "好得不像真的" },
          explanation: {
            en: "15% every week with zero risk does not exist anywhere in the world. Real investments always carry risk.",
            zh: "每周15%还零风险的投资在全世界都不存在。真正的投资一定有风险。",
          },
        },
        {
          name: { en: "Small first step", zh: "先要小钱" },
          explanation: {
            en: "Starting with just $500 feels safe. The platform will show fake profits, then push you to invest much more before it vanishes.",
            zh: "先投500元让您觉得安全。平台会显示假盈利，引诱您投入更多，然后卷款消失。",
          },
        },
        {
          name: { en: "Closing-tonight pressure", zh: "限时施压" },
          explanation: {
            en: '"Slots close tonight" is fake scarcity to stop you from checking with others first.',
            zh: "“今晚截止”是假的紧缺，目的是不让您先跟别人商量。",
          },
        },
      ],
      advice: [
        { en: "Do not transfer any money to the platform.", zh: "不要向该平台转任何钱。" },
        {
          en: "Check if the platform is licensed on the MAS Financial Institutions Directory.",
          zh: "在金管局(MAS)官方名录查询该平台是否持牌。",
        },
        {
          en: "Discuss with your family before any investment.",
          zh: "任何投资之前先和家人商量。",
        },
      ],
    },
  },
];
