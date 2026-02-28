#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
补充5篇文章 - 从75篇补齐到80篇
"""

import json

# 生成最后5篇文章
final_5_articles = [
    {
        "id": "article_091",
        "title": "宝宝添加辅食过敏症状",
        "category": "6-12个月",
        "tags": ["辅食", "过敏", "症状"],
        "summary": "宝宝添加辅食后出现过敏反应怎么办？本文提供识别和应对方法。",
        "description": "宝宝添加辅食过敏症状的详细指导，帮助父母及时发现和处理过敏。",
        "quickAnswers": [
            {"question": "辅食过敏有什么症状？", "answer": "皮疹、荨麻疹、面部肿胀、呕吐、腹泻、呼吸困难。严重时出现过敏性休克。"},
            {"question": "最容易过敏的食物有哪些？", "answer": "牛奶、鸡蛋、花生、坚果、鱼类、贝类、大豆、小麦。"},
            {"question": "如何预防辅食过敏？", "answer": "逐一添加新食物（间隔3-5天）、从少量开始、观察72小时、高危食物延后。"},
            {"question": "出现过敏反应怎么办？", "answer": "立即停止该食物、轻微症状观察、严重反应立即就医（呼吸困难、面部肿胀）。"},
            {"question": "什么时候可以再次尝试？", "answer": "轻微过敏后等待3-6个月，严重过敏需医生评估后决定。"}
        ],
        "content": [
            {"type": "heading", "text": "辅食过敏的常见症状"},
            {"type": "bullet", "text": "皮肤反应：皮疹、荨麻疹、红斑、瘙痒、面部眼唇肿胀"},
            {"type": "bullet", "text": "消化道反应：呕吐、腹泻、腹痛、便血"},
            {"type": "bullet", "text": "呼吸道反应：流涕、咳嗽、喘息、呼吸困难"},
            {"type": "bullet", "text": "全身反应：烦躁不安、面色苍白、血压下降（过敏性休克）"},
            {"type": "heading", "text": "最容易过敏的8大类食物"},
            {"type": "numbered", "text": "牛奶及奶制品（1岁后添加）"},
            {"type": "numbered", "text": "鸡蛋（蛋黄8个月、蛋白1岁）"},
            {"type": "numbered", "text": "花生和坚果（3-5岁后添加，整粒有窒息风险）"},
            {"type": "numbered", "text": "鱼类和贝类"},
            {"type": "numbered", "text": "大豆制品"},
            {"type": "numbered", "text": "小麦"},
            {"type": "numbered", "text": "芝麻"},
            {"type": "heading", "text": "如何添加辅食预防过敏"},
            {"type": "numbered", "text": "逐一添加：每次只添加一种新食物"},
            {"type": "numbered", "text": "间隔时间：新食物之间间隔3-5天"},
            {"type": "numbered", "text": "从少到多：第一次只给1-2小勺"},
            {"type": "numbered", "text": "观察时间：添加后观察72小时"},
            {"type": "numbered", "text": "高危延后：家族过敏史的食物延后添加"},
            {"type": "heading", "text": "出现过敏反应的处理"},
            {"type": "numbered", "text": "立即停止：停止食用可疑食物"},
            {"type": "numbered", "text": "记录症状：记录症状、时间、食物种类和量"},
            {"type": "numbered", "text": "轻微症状：皮肤瘙痒可用冷敷、观察"},
            {"type": "numbered", "text": "严重症状：呼吸困难、面部肿胀、全身反应立即就医"},
            {"type": "heading", "text": "何时需要就医"},
            {"type": "bullet", "text": "呼吸困难、喘息、喉咙发紧"},
            {"type": "bullet", "text": "面部、嘴唇、舌头肿胀"},
            {"type": "bullet", "text": "全身性皮疹或荨麻疹"},
            {"type": "bullet", "text": "持续呕吐或腹泻"},
            {"type": "bullet", "text": "烦躁不安、嗜睡、面色苍白"},
            {"type": "info", "text": "⚠️ 严重过敏反应（过敏性休克）是医疗急症，需要立即就医或拨打急救电话！"}
        ]
    },
    {
        "id": "article_092",
        "title": "宝宝学走路时间",
        "category": "6-12个月",
        "tags": ["学走路", "发育", "里程碑"],
        "summary": "宝宝什么时候学走路？如何帮助宝宝学走路？本文提供科学指导。",
        "description": "宝宝学走路时间和方法的详细指导，帮助父母支持宝宝运动发育。",
        "quickAnswers": [
            {"question": "宝宝什么时候开始学走路？", "answer": "大部分宝宝在11-15个月开始独立走路，正常范围是9-18个月。"},
            {"question": "如何帮助宝宝学走路？", "answer": "多趴、爬行练习、扶站练习、使用推车、光脚练习、避免学步车。"},
            {"question": "学步车可以用吗？", "answer": "不建议。学步车可能导致O型腿、走路姿势不正确、延迟正常发育。"},
            {"question": "走路晚是发育落后吗？", "answer": "18个月前会走路都算正常。如果18个月还不会走，需要咨询医生。"},
            {"question": "宝宝走路O型腿正常吗？", "answer": "2岁前的O型腿是正常的生理现象，会随着年龄增长自然矫正。"}
        ],
        "content": [
            {"type": "heading", "text": "学走路的时间线"},
            {"type": "bullet", "text": "6-8个月：扶站、扶着家具站立"},
            {"type": "bullet", "text": "9-11个月：扶走、拉着家具走"},
            {"type": "bullet", "text": "11-13个月：尝试独立走1-2步"},
            {"type": "bullet", "text": "13-15个月：独立走，走路还不稳"},
            {"type": "bullet", "text": "15-18个月：走得比较稳，会跑和蹲"},
            {"type": "heading", "text": "如何帮助宝宝学走路"},
            {"type": "numbered", "text": "多趴：从新生儿开始多趴，增强背部和颈部肌肉"},
            {"type": "numbered", "text": "爬行练习：爬行是走路的重要前奏，协调全身肌肉"},
            {"type": "numbered", "text": "扶站练习：在安全环境下练习扶站"},
            {"type": "numbered", "text": "使用推车：可以使用推助步车（不是学步车）"},
            {"type": "numbered", "text": "光脚练习：在家光脚走路，感受地面，练习平衡"},
            {"type": "numbered", "text": "鼓励和表扬：给宝宝信心和鼓励"},
            {"type": "heading", "text": "不建议的做法"},
            {"type": "bullet", "text": "学步车：会导致O型腿、走路姿势不正确、延迟发育"},
            {"type": "bullet", "text": "强行练习：不要强迫宝宝练习，会让他恐惧"},
            {"type": "bullet", "text": "过度保护：适当让宝宝摔倒，学习自我保护"},
            {"type": "bullet", "text": "穿袜子：光脚更有利于平衡和脚部发育"},
            {"type": "heading", "text": "走路O型腿和X型腿"},
            {"type": "bullet", "text": "0-2岁：O型腿是正常的生理现象"},
            {"type": "bullet", "text": "2-4岁：腿型逐渐变直"},
            {"type": "bullet", "text": "3-6岁：可能出现X型腿，也是正常的"},
            {"type": "bullet", "text": "7-8岁：腿型逐渐接近成人"},
            {"type": "info", "text": "💡 如果宝宝18个月还不会走路，或者走路时明显一瘸一拐、疼痛，需要咨询儿科医生。"}
        ]
    },
    {
        "id": "article_093",
        "title": "宝宝接种疫苗反应",
        "category": "0-6个月",
        "tags": ["疫苗", "接种", "反应"],
        "summary": "宝宝接种疫苗后会有什么反应？哪些是正常的？哪些需要看医生？",
        "description": "宝宝接种疫苗反应的详细指导，帮助父母识别正常反应和异常情况。",
        "quickAnswers": [
            {"question": "接种疫苗后会有什么反应？", "answer": "常见反应：发热（37.5-38.5°C）、接种部位红肿疼痛、烦躁、食欲下降。"},
            {"question": "发热怎么处理？", "answer": "38.5°C以下物理降温（多喝水、少穿、温水擦），38.5°C以上可用退烧药（遵医嘱）。"},
            {"question": "可以洗澡吗？", "answer": "可以，但避免揉搓接种部位，保持接种部位干燥清洁。"},
            {"question": "哪些反应需要就医？", "answer": "发热>39°C、持续>3天、接种部位严重红肿、过敏性反应（呼吸困难、皮疹）。"},
            {"question": "可以吃退烧药预防吗？", "answer": "不建议预防性用药。只有出现发热不适时才需要用药。"}
        ],
        "content": [
            {"type": "heading", "text": "疫苗接种后的正常反应"},
            {"type": "bullet", "text": "发热：37.5-38.5°C，持续1-2天"},
            {"type": "bullet", "text": "局部反应：接种部位红肿、疼痛、硬结"},
            {"type": "bullet", "text": "全身反应：烦躁、哭闹、嗜睡、食欲下降"},
            {"type": "bullet", "text": "轻微皮疹：少数疫苗可能出现轻微皮疹"},
            {"type": "heading", "text": "如何护理发热"},
            {"type": "numbered", "text": "多喝水：补充水分，防止脱水"},
            {"type": "numbered", "text": "少穿衣服：避免过度包裹"},
            {"type": "numbered", "text": "温水擦浴：用温水（不是酒精）擦额头、腋下、腹股沟"},
            {"type": "numbered", "text": "退烧药：38.5°C以上可用对乙酰氨基酚或布洛芬"},
            {"type": "numbered", "text": "观察精神：如果精神好、能玩能吃，不用担心"},
            {"type": "heading", "text": "如何护理局部反应"},
            {"type": "bullet", "text": "保持清洁：接种部位保持干燥清洁"},
            {"type": "bullet", "text": "冷敷：前24小时冷敷减轻肿胀和疼痛"},
            {"type": "bullet", "text": "热敷：24小时后可热敷促进硬结吸收"},
            {"type": "bullet", "text": "避免揉搓：不要揉搓接种部位"},
            {"type": "bullet", "text": "洗澡：可以洗澡，但避免长时间浸泡"},
            {"type": "heading", "text": "哪些反应需要就医"},
            {"type": "bullet", "text": "高热：体温>39°C，或持续>3天"},
            {"type": "bullet", "text": "严重局部反应：红肿直径>5cm，或持续加重"},
            {"type": "bullet", "text": "过敏反应：呼吸困难、喘鸣、面部肿胀、全身皮疹"},
            {"type": "bullet", "text": "神经系统症状：持续哭闹>3小时、惊厥、嗜睡难唤醒"},
            {"type": "bullet", "text": "其他异常：呕吐、腹泻、苍白、发绀"},
            {"type": "heading", "text": "疫苗接种后的注意事项"},
            {"type": "bullet", "text": "留观30分钟：接种后在医院留观30分钟，观察过敏反应"},
            {"type": "bullet", "text": "多休息：接种后让宝宝多休息，避免剧烈运动"},
            {"type": "bullet", "text": "清淡饮食：避免刺激性食物"},
            {"type": "bullet", "text": "记录反应：记录接种时间、疫苗种类、宝宝反应"},
            {"type": "info", "text": "💡 大多数疫苗接种反应是轻微的，1-2天内会自行消失。如果反应严重或持续，及时就医。"}
        ]
    },
    {
        "id": "article_094",
        "title": "宝宝如厕训练最佳方法",
        "category": "1-3岁",
        "tags": ["如厕", "训练", "如厕训练"],
        "summary": "宝宝什么时候开始如厕训练？如何进行如厕训练？本文提供科学方法。",
        "description": "宝宝如厕训练最佳时间和方法的详细指导，帮助父母顺利完成如厕训练。",
        "quickAnswers": [
            {"question": "宝宝什么时候可以开始如厕训练？", "answer": "18-24个月是最佳时机。需具备：能保持尿布干2小时以上、能表达如厕需求、能自己穿脱裤子。"},
            {"question": "如何开始如厕训练？", "answer": "选择合适的时机、准备小马桶、建立规律、表扬成功、不要强迫。"},
            {"question": "需要多长时间？", "answer": "通常需要3-6个月。白天先训练，晚上等白天稳定后再训练。"},
            {"question": "宝宝抗拒怎么办？", "answer": "暂停训练，等待2-4周后重新开始。不要强迫，否则会产生负面情绪。"},
            {"question": "男孩和女孩训练有区别吗？", "answer": "基本方法相同。男孩可以先坐着尿，熟练后再教站着尿。"}
        ],
        "content": [
            {"type": "heading", "text": "如厕训练的准备信号"},
            {"type": "bullet", "text": "尿布保持干燥2小时以上"},
            {"type": "bullet", "text": "对别人的如厕行为感兴趣"},
            {"type": "bullet", "text": "能表达或示意如厕需求（语言、动作、表情）"},
            {"type": "bullet", "text": "能自己穿脱简单的裤子"},
            {"type": "bullet", "text": "能听懂并遵循简单的指令"},
            {"type": "bullet", "text": "不愿意在尿布里大小便"},
            {"type": "heading", "text": "如厕训练的步骤"},
            {"type": "numbered", "text": "准备工具：小马桶、小内裤、绘本"},
            {"type": "numbered", "text": "介绍马桶：让宝宝熟悉小马桶，可以坐上去玩"},
            {"type": "numbered", "text": "观察规律：观察宝宝的如厕时间规律"},
            {"type": "numbered", "text": "定时练习：每天固定时间让宝宝坐马桶（起床后、饭后）"},
            {"type": "numbered", "text": "表扬成功：成功时给予大大的表扬和奖励"},
            {"type": "numbered", "text": "处理意外：意外时不要责备，平静地清理"},
            {"type": "heading", "text": "如厕训练的注意事项"},
            {"type": "bullet", "text": "不要强迫：如果宝宝抗拒，暂停训练"},
            {"type": "bullet", "text": "耐心等待：每个宝宝节奏不同，不要比较"},
            {"type": "bullet", "text": "先白天后晚上：白天训练稳定后再训练晚上"},
            {"type": "bullet", "text": "不要责备：意外是正常的，不要批评或惩罚"},
            {"type": "bullet", "text": "正向强化：多用表扬和鼓励，少用批评"},
            {"type": "heading", "text": "如厕训练的常见问题"},
            {"type": "heading", "text": "问题1：宝宝拒绝坐马桶"},
            {"type": "bullet", "text": "原因：害怕、不习惯、时机未到"},
            {"type": "bullet", "text": "解决：暂停训练，等待2-4周后重新开始"},
            {"type": "heading", "text": "问题2：白天成功，晚上失败"},
            {"type": "bullet", "text": "正常现象：晚上控制比白天难"},
            {"type": "bullet", "text": "解决：白天稳定后再训练晚上，夜间可以使用拉拉裤"},
            {"type": "heading", "text": "问题3：训练一段时间后又倒退"},
            {"type": "bullet", "text": "常见原因：生病、家里有变化、压力、弟弟妹妹出生"},
            {"type": "bullet", "text": "解决：不要责备，给予理解和支持，等待恢复"},
            {"type": "info", "text": "💡 如厕训练是宝宝成长的重要里程碑，需要父母的耐心和支持。不要和其他宝宝比较，每个宝宝都有自己的节奏。"}
        ]
    },
    {
        "id": "article_095",
        "title": "宝宝安全座椅选购指南",
        "category": "1-3岁",
        "tags": ["安全座椅", "安全", "选购"],
        "summary": "如何为宝宝选择合适的安全座椅？不同年龄段应该用什么类型的安全座椅？",
        "description": "宝宝安全座椅选购的详细指南，帮助父母选择合适的安全座椅保护宝宝安全。",
        "quickAnswers": [
            {"question": "宝宝什么时候需要安全座椅？", "answer": "从出生开始，法律规定12岁以下儿童必须使用安全座椅或增高垫。"},
            {"question": "如何选择合适的安全座椅？", "answer": "根据体重和身高选择，不是根据年龄。0-13kg用提篮，9-18kg用前置护体，15-36kg用增高垫。"},
            {"question": "安全座椅安装在哪里？", "answer": "后排中间最安全，其次后排两侧。绝对不能安装在副驾驶（有气囊）。"},
            {"question": "可以买二手的安全座椅吗？", "answer": "不建议。无法确认是否经历过事故、是否有损坏、是否过期。"},
            {"question": "安全座椅可以用多久？", "answer": "通常6年。过期后塑料老化，安全性能下降，需要更换。"}
        ],
        "content": [
            {"type": "heading", "text": "安全座椅的分类和选择"},
            {"type": "heading", "text": "0-13kg（约0-15个月）"},
            {"type": "bullet", "text": "类型：提篮式安全座椅"},
            {"type": "bullet", "text": "安装方向：必须反向安装"},
            {"type": "bullet", "text": "原因：婴儿颈部力量弱，反向安装保护头部和颈部"},
            {"type": "bullet", "text": "使用时间：从出生到15个月或体重超过13kg"},
            {"type": "heading", "text": "9-18kg（约9个月-4岁）"},
            {"type": "bullet", "text": "类型：前置护体或五点式安全带"},
            {"type": "bullet", "text": "安装方向：可以前向安装"},
            {"type": "bullet", "text": "使用时间：9kg-18kg（通常使用到4岁）"},
            {"type": "heading", "text": "15-36kg（约4-12岁）"},
            {"type": "bullet", "text": "类型：增高垫+汽车安全带"},
            {"type": "bullet", "text": "安装方向：前向安装"},
            {"type": "bullet", "text": "使用时间：15kg-36kg（通常使用到12岁）"},
            {"type": "heading", "text": "安全座椅的安装位置"},
            {"type": "bullet", "text": "最佳位置：后排中间（最安全）"},
            {"type": "bullet", "text": "次选位置：后排两侧"},
            {"type": "bullet", "text": "绝对禁止：副驾驶（有气囊，致命危险）"},
            {"type": "bullet", "text": "特殊情况：如果必须坐在副驾驶，必须关闭气囊"},
            {"type": "heading", "text": "安全座椅使用注意事项"},
            {"type": "numbered", "text": "正确安装：严格按照说明书安装，确保稳固"},
            {"type": "numbered", "text": " recline角度：反向安装时角度45度，避免头部前倾"},
            {"type": "numbered", "text": "安全带紧度：安全带应紧贴身体，不能松动"},
            {"type": "numbered", "text": "冬季穿衣：不要穿太厚的羽绒服，影响安全带效果"},
            {"type": "numbered", "text": "定期检查：定期检查安全带和卡扣是否完好"},
            {"type": "heading", "text": "常见错误"},
            {"type": "bullet", "text": "过早前向安装：15个月前必须反向安装"},
            {"type": "bullet", "text": "安全带过松：安全带应紧贴，不能塞入手指"},
            {"type": "bullet", "text": "穿厚衣服：冬季应脱掉羽绒服再系安全带"},
            {"type": "bullet", "text": "使用二手座椅：无法确认是否过期或经历过事故"},
            {"type": "bullet", "text": "过早使用增高垫：体重和身高未达标前不要使用"},
            {"type": "info", "text": "⚠️ 安全座椅是宝宝乘车安全的最后一道防线，正确使用能降低70%以上的受伤和死亡风险。请务必正确安装和使用！"}
        ]
    }
]

# 保存
with open('/tmp/parenting-miniprogram/data_5final_articles.js', 'w', encoding='utf-8') as f:
    f.write("// 最后5篇文章 - 补齐到80篇\n")
    f.write("// 生成时间：2026-02-28\n\n")
    f.write("const finalArticles = ")
    json.dump(final_5_articles, f, ensure_ascii=False, indent=2)
    f.write(";\n")

print(f"✅ 已生成最后5篇文章")
print(f"📊 文章编号：article_091 - article_095")
print(f"💾 已保存到 data_5final_articles.js")
print()
print("现在有：")
print(f"  - 原有文章：50篇")
print(f"  - 第一次新增：25篇")
print(f"  - 最后补充：5篇")
print(f"  - 总计：80篇 ✅")
