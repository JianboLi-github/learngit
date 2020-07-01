#!/usr/bin/env python
# -*- coding:utf-8 —*-
import os
import csv

# 列出当前文件夹下所有的文件,筛出autostart_xxxxx.log
files = os.listdir('.')
logs = [log for log in files if log.startswith('autostart') and log.endswith('.log')]

# 保存所有的crash信息
csvName = 'crash_%s.csv'%logs[0][10:16]
with open(csvName, 'w') as cf:
	headers = ['logName', 'crashCount', 'info']
	cf_csv = csv.writer(cf)
	cf_csv.writerow(headers)
	
	for log in logs:
		row = []
		# 获取crash信息
		cmdCount = 'grep "died" %s | wc -l'%log
		resultCount = os.popen(cmdCount)
		count = resultCount.read().split()[0]
		resultCount.close()
		cmdText = 'grep "died" %s'%log
		resultText = os.popen(cmdText)
		text = resultText.read()
		resultText.close()
		
		row.append(log)
		row.append(count)
		row.append(text)
		cf_csv.writerow(rows)
		
		# cf_csv.writerows(rows)
