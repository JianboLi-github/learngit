# -*- coding: utf-8 -*-

# Filename: teset.py
# author by: baruch

# 导入复数数学模块cmath(complex math)
import cmath
import sys
import random
import calendar 
import datetime
import time




# 实现秒表
print('`enter`开始计时，ctrl+c停止计时')
while True:
    try:
        input()
        starttime = time.time()
        print('开始')
        while True:
            print('计时：', round(time.time() - starttime(), 0), '秒', end='\r')
            time.sleep(1)
    except KeyboardInterrupt:
        print('结束')
        endtime = time.time()
        print('总共的时间为：', round(endtime - starttime, 2), 'secs')
        break        



# 五人分鱼
def fishes():
    fish =1
    while True:
        total, enough = fish, True
        for _ in range(5):
            if (total - 1 ) % 5 == 0:
                total = (total - 1) // 5 * 4
            else:
                enough = False
                break
        if enough:
            print('总共有{}条鱼'.format(fish))
            break
        fish += 1
fishes()
sys.exit()


# 约瑟夫死亡游戏
# 30人需要15人船。排成一队，第9个人下船直到剩余15人
people = {}
for x in range(1, 31):
    people[x] = 1
check = 0
i,j = 1, 0
while i <= 31:
    if i == 31:
        i = 1
    elif j == 15:
        break
    else:
        if people[i] == 0:
            i += 1
            continue
        else:

            check += 1
            if check == 9:
                people[i] = 0
                check = 0
                print('{}号选手下海了'.format(i))
                j += 1
            else:
                i += 1
                continue
sys.exit()

# 获取昨天日期， 引入datetime模块
def getYesterday():
    today = datetime.date.today()
    oneday = datetime.timedelta(days=1)
    return today - oneday



# 字符串大小写转换
def change():
    str = 'www.somewhere.com'
    print(str.upper())
    print(str.lower())
    print(str.capitalize()) # 把第一个字母转化为大写字母，其余小写
    print(str.title()) # 把每个单词的第一字母转化为大写
change()

# 字符串判断
def itis(str = 'never say die'):
    print(str.isalnum()) # 判断所有字符都是数字或者字母
    print(str.isalpha()) # 判断所有字符都是字母
    print(str.isdigit()) # 判断所有字符都是数字
    print(str.islower()) # 判断所有字符都是小写
    print(str.isupper()) # 判断所有字符都是大写
    print(str.istitle()) # 判断所有单词都是首字母大写，像标题
    print(str.isspace()) # 判断所有字符都是空白字符、\t、\n、\r
    print('\\/-\\/'* 20)
itis()
sys.exit()


# 递归生成斐波那契数列
def recur_fibo(n):
    '''递归函数
    输出斐波那契数列
    '''
    if n <= 1:
        return n
    else:
        return(recur_fibo(n-1) + recur_fibo(n - 2))

nterms = int(input('输出前n项(n > 0)，n= '))
for i  in range(nterms):
    print(recur_fibo(i))

sys.exit()


# 生成日历 引入日历模块
# 输入指定的年月
yy = int(input('输入年份:'))
mm = int(input('输入月份(1-12)：'))
print( calendar.month(yy, mm))
# 计算每个月天数
print(calendar.monthrange(yy, mm))




sys.exit()


# 简单的计算器
def calculate():
    st = input('输入要计算的二元计算式: ')
    add = st.split('+')
    sub = st.split('-')
    mult = st.split('*')
    devi = st.split('/')
    if len(add) is 2:
        return float(add[0]) + float(add[1])
    elif len(sub) is 2:
        return float(sub[0]) + float(sub[1])
    elif  len(mult) is 2:
        return float(mult[0]) + float(mult[1])
    elif len(devi) is 2:
        return float(devi[0]) + float(devi[1])
    else:
        raise ValueError
print(calculate())
sys.exit()

# 转换进制
num = 27
print(' dec: {0}\n oct: {1}\n hex: {2}\n bin: {3}\n'.format(num, oct(num), hex(num), bin(num) ))


# 阿姆斯特朗数
num = 1000

for i in range(1, num):
    sum = 0
    # 指数
    n = len(str(i))
    # 检测
    tmp = i
    while tmp > 0:        
        digit  = tmp % 10
        sum += digit ** n
        tmp //= 10
    # 输出结果
    if i == sum:
        print(i, end =' ') 


sys.exit() 

# 斐波那契数列
n1, n2 = 0, 1
n = 10
for i in range(n):
    print(n2, end=' ')
    n1, n2 = n2, n1+n2
print()
sys.exit()

# 乘法表
for i in range(10, 0, -1):
    for j in range(i+1, 0, -1):
        print('{}x{}={}\t'.format(j, i, i*j), end='')
    print()


# 计算阶乘
num = int(-5)

def factorial(num):
    if num < 0:
        return 'you are kidding me'
    elif num is 0:
        return 1
    else:
         return num * factorial(num -1)

print(factorial(num))
sys.exit()


# 输出指定范围内的素数
lower = 10
upper = 100

for num in range(lower, upper):
    if num > 1:
        for i in range(2, num // 2):
            if num % i is 0: 
                break
        else :
            print(num, end=' ')
print()


# 奇偶判断
num = random.randint(0, 100)
flag = '偶数' if num % 2 is 0 else '奇数'
print('{0}是{1}'.format(num, flag))


# 自定义方法判断字符串是否为数字
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        pass

    try:
        import unicodedata 
        unicodedata.numeric(s)
        return True
    except (TypeError, ValueError):
        pass
    return False

def test_number():
    # 测试字符串和数字
    print(is_number('foo'))   # False
    print(is_number('1'))     # True
    print(is_number('1.3'))   # True
    print(is_number('-1.37')) # True
    print(is_number('1e3'))   # True
    
    # 测试 Unicode
    # 阿拉伯语 5
    print(is_number('٥'))  # True
    # 泰语 2
    print(is_number('๒'))  # True
    # 中文数字
    print(is_number('四')) # True
    # 版权号
    print(is_number('©'))  # False

# 交换变量，无临时变量
x,y = 3, 4
print('x={0}, y={1}'.format(x, y))
x,y = y,x
print('x={0}, y={1}'.format(x, y))

#设置度转换为华氏温度
celsius = float(48.0)
fahrenheit = (celsius * 1.8) + 32
print('{0:.1f} 摄氏度转换为华氏温度为 {1:.1f}'.format(celsius, fahrenheit))


# 生成随机数
print(random.randint(0, 9))

# 计算三角形的面积
a, b, c = 3, 4, 5

# 计算半周长
s = (a + b + c) / 2

# 计算面积：海伦公式
area = (s*(s-a)*(s-b)*(s-c)) ** 0.5
print('三角形面积为{0:.2f}'.format(area))
sys.exit()

#求解二次方程ax*2 + bx + c = 0 (a≠0)
a = float(input('输入 a: '))
b = float(input('输入 b: '))
c = float(input('输入 c: '))

d = (b**2) - (4*a*c)
sol1 = (-b-cmath.sqrt(d))/(2*a)
sol2 = (-b+cmath.sqrt(d))/(2*a)

print('结果为：{0:.3f}和{1:.3f}'.format(sol1, sol2))


# 进行负数和复数的运算
num = int(input('请输入一个数字:'))
num_sqrt = cmath.sqrt(num)
print('{0}的平方根为:{1:0.3f}+{2:0.3f}j'.format(num,num_sqrt.real, num_sqrt.imag))


# 正数的运算
num = float(input('请输入一个数字：'))
num_sqrt = num ** 0.5
print('{0}的平方根为{1:.3f}'.format(num, num_sqrt))