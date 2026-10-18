"""Convert Traditional Chinese (Taiwan) text to Simplified Chinese with mainland wording, for the
game's 简体中文 files. The story stays in Taiwan; only the script and the wording change.
usage: python3 scripts/zhcn.py <src> <dst>   (needs: pip install opencc-python-reimplemented)
Converts the whole file; non-CJK text is untouched. After OpenCC's tw2sp, FIXES repairs what it
gets wrong for this game. Read the result before committing: names used as keys (PEOPLE[].key)
must stay in Traditional Chinese, and some clues need rewriting rather than converting."""
import sys
from opencc import OpenCC

cc = OpenCC('tw2sp')
FIXES = [
    ('屏幕截屏', '屏幕截图'),
    ('截屏', '截图'),
    ('终端机', '终端'),
    ('指令积木', '命令积木'),
    ('建议指令', '建议命令'),
    ('可用指令', '可用命令'),
    ('终端指令', '终端命令'),
    ('这个指令', '这个命令'),
    ('输入指令', '输入命令'),
    ('填好指令', '填好命令'),
    ('组出指令', '组出命令'),
    ('之前的指令', '之前的命令'),
    ("tbCommand: '指令'", "tbCommand: '命令'"),
    ('钉选', '钉住'),
    ('纪录', '记录'),
    ('评等', '评级'),
    ('二进位', '二进制'),
    ('寄件者', '发件人'),
    ('收件者', '收件人'),
    ('家目录', '主目录'),
    ('下载项目', '下载'),
    ('拖曳', '拖动'),
    ('快转', '快进'),
    ('运作', '运行'),
    ('收下数据', '收下资料'),
    ('钉住的数据', '钉住的内容'),
    ('符合窗口', '适合窗口'),
    ('中继数据', '元数据'),
    ('中继资料', '元数据'),
    ('身分', '身份'),
    ('仿真', '模拟'),
    ('帐号', '账号'),
    ('帐户', '账户'),
    ('泄漏', '泄露'),
    ('复选', '多选'),
    ('补完', '补全'),
    ('叫出', '调出'),
    ('图形接口', '图形界面'),
    ('文本档', '文本文件'),
    ('志工', '志愿者'),
    ('书签列', '书签栏'),
    ('脱机', '离线'),
    ('印出来', '打印出来'),
    ('源文件案', '原始文件'),
    ('原档', '原始文件'),
    ('擡头', '抬头'),
    ('粘贴去了', '贴上去了'),
    ('缺省', '默认'),
    ('饭店', '酒店'),
    ('笔电', '笔记本'),
    ('贴文', '帖子'),
    ('资安', '信息安全'),
    ('人资', '人事'),
    ('特休', '年假'),
    ('主旨', '主题'),
    ('转寄', '转发'),
    ('新分页', '新标签页'),
    ('可交换图档格式', '可交换图像文件格式'),
    ('照片档', '照片文件'),
    ('邮递区号', '邮政编码'),
    ('社群平台', '社交平台'),
    ('去识别化', '去标识化'),
    ('雪梨', '悉尼'),
    ('智能型手机', '智能手机'),
    ('原子笔', '圆珠笔'),
    ('利木津巴士', '机场大巴'),
    ('新创', '初创公司'),
    ('打指令', '敲命令'),
    ('熟指令', '熟命令'),
    ('处理影像', '处理图像'),
    ('原代码', '源代码'),
    ('社群帖子', '社交平台帖子'),
]


def convert(text):
    out = cc.convert(text)
    for a, b in FIXES:
        out = out.replace(a, b)
    return out


if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    open(dst, 'w', encoding='utf-8').write(convert(open(src, encoding='utf-8').read()))
    print('wrote', dst)
