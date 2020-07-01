#!/usr/bin/env  python2.7
# -*- coding:utf-8 -*-

import os
import time
import tarfile
import socket
import base64

	

	
today = time.strftime('%Y%m%d')
hostname = socket.gethostname()[-4:]
local_path = '/home/riseauto/rsData/log/'
tfname = '%s%s_%s.tgz'% (local_path, hostname, today)

def files2tgz(tfname):
	
	# tarfile时总是没有压缩完成就被上传了。。
	# ￥@#￥！@%！#%！@#，算了要不起
	with tarfile.open(tfname, 'w:gz') as tf:
		for fname in os.listdir(local_path):
			if today in fname or fname.startswith('text'):
				tf.add(fname)
	if tarfile.is_tarfile(tfname):
		return True

def tarlog(tfname):
	
	cmd = 'tar czvf %s *%s*'%(tfname, today)
	flag =  os.system(cmd)
	print 'tarlog() is run .flag:%s'%flag
	return flag == 0

def upload(host, username,password, tfname):

	
	cmd = 'sshpass -p %s scp %s %s@%s://home/data/'%(base64.b64decode(password), tfname, username, host)

	if os.path.isfile(tfname):
		stmp = os.system(cmd)
		print 'upload is run .stmp:%s'%stmp
		return stmp == 0
	
'''正则表达式是最伟大的'''


if __name__ == '__main__':
	
	flag = tarlog(tfname)
	# print '生成压缩包:%s'%tfname
	
	host = 'xxxxxx'
	# host = '10.8.0.1'
	username= 'xx'
	
	password = b'UWF6MTIz'
		
	if upload(host, username, password, tfname):
		os.remove(tfname)

