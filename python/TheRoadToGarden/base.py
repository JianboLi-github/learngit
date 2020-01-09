import re
import sys
import json
import time



# date and time
ticks = time.time()
localtime = time.localtime(ticks)
print(localtime)
print(ticks)
sys.exit()

# python2json
# python 对象转换为json字符串、python对象存储成json文件
myobject = {
    'key2': {
        'key31': None,
        'key32': False,
        'key33': 13.6,
    },
    'key1':  {
        'key22': ['value221', 'value222']
    }
}
# 将对象或对象转化为json字符串
jsonstr = json.dumps(myobject, indent=4, sort_keys=True)
print(jsonstr)

# 将对象或对象数组写入json文件：method 1
with open('data/data.json', 'w') as f:
    json.dump(myobject, f)

# python 对象或对象数组写入json文件： method 2
import io
f = io.open('data/data1.json', 'w', encoding='utf-8')
json.dump(myobject, f, ensure_ascii=False)
sys.exit()



# regulation
m = re.match(r'(\w+) (\w+)(?P<sign>.*)', 'hello world!')

print('m.string:', m.string)
print('m.re:', m.re)
print('m.pos', m.pos)
print('m.endpos:', m.endpos)
print('m.lastindex:', m.lastindex)
print('m.lastgroup:', m.lastgroup)
print('m.group():', m.group())
print('m.group(1, 2):', m.group(1, 2))
print('m.groups():', m.groups())
print('m.groupdict():', m.groupdict())
print('m.start(2):', m.start(2))
print('m.end(2)', m.end(2))
print('m.span(2)', m.span(2))
print(r'm.expand(r"\g \g\g"):', m.expand(r'\2 \1\3') )




sys.exit()

text = '.525heart.com\n'
patternstr = r'\.525heart.com\n'

print(patternstr)
pattern = re.compile(patternstr)

result = re.search(pattern, text)
print(result.group())

pattern = re.compile(r'hello')

result1 = re.match(pattern, 'hello')
result2 = re.match(pattern, 'helloo world!')
result3 = re.match(pattern, 'helo world!')
result4 = re.match(pattern, 'hello woorld!')

if result1:
    print(result1.group())
else:
    print('1 匹配失败')

if result2:
    print(result2.group())
else:
    print('2 匹配失败')

if result3:
    print(result3.group())
else:
    print('3 匹配失败')

if result4:
    print(result4.group())
else:
    print('4 匹配失败')
