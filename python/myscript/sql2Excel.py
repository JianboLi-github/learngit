#!/usr/bin/env python3
# -*- coding:utf-8 -*-

"""
	sqlit3数据库表数据的导出和导入
	
		导入：
			|__csv文件指定，备份已有数据库表，插入csv文件中的数据到数据库,input('csv文件：filename.csv')
			|__csv文件没有指定，不会向数据库插入数据
			|__readcsv()
		导出：
			|__csv形式备份已有数据库表数据,tablename_timestampe.csv
			|__write2csv()
		注意：
			|__数据库名和数据库表名一定要指定
			|__尽可能避免修改csv文件
			|__csv文件的字段需要和表的列对应
			|__ubuntu运行时需要指定python版本：python3 table_Excel.py
			|__windows和Ubuntu导出的csv文件编码不同，使用的时候需要修改编码格式
				|__vim 打开 csv :set encoding=utf-8
				|__file filename  查看文件编码格式
"""
import os
import sqlite3 
import time
import csv


def isFile(name, path=os.getcwd()):
	"""
	返回文件绝对路径
	
		path: 文件存放路径, 默认当前路径
		name: 文件名
		
		return: 文件绝对路径
	"""
	print('isFile:', name, path)
	if name is not None:
		return os.path.join(path, name)
		


def Query(connect, tablename, fetchone=False):
	"""
	查询指定数据库表格的数据
		
		connect: 数据库连接
		tablename: 数据库表名
		fetchone: 默认获取所有数据
		
		return: 返回查询数据
	"""
	cursor = connect.cursor()
	sql = 'select * from %s'%tablename
	try:
		cursor.execute(sql)
		# return cursor.fetchmany(rows)
		if fetchone is False:
			return cursor.fetchall()
		else:
			return cursor.fetchone()
	except Exception as e:
		print('Query Exception: %s'%e)
	finally:
		cursor.close()
	

def Insert(connect, tablename, 	data=None):
	"""
	插入数据
	
		data: 接收list形式传递的数据
		
		return: 是否插入成功
	"""
	
	if '' is tablename and data is None:
		return False
		
	print('Insert:',tablename, data[0],'...')
	
	
	try:
	
		cursor = connect.cursor()
		space = ','.join('?' * len(data[0]))
		sql = 'insert into %s values (%s)'%(tablename, space)
		count = 0
		
		for item in data:
			cursor.execute(sql, item) # 使用占位符，不要丢了后面的数据
			# 通过rowcount获得插入的行数
			count += cursor.rowcount
		
		return count == len(data)
		
	except Exception as e:
		connect.rollback()
		print('Insert Exception:', e)
	finally:
		cursor.close()
		connect.commit()


def Update(connect, tablename, data=None):
	pass
	

def Delete(connect, tablename):
	"""
	删除指定数据库表的所有数据
	
		return: 返回删除行数
	"""
	try:
	
		cursor = connect.cursor()
		sql = 'delete from %s'%tablename
		cursor.execute(sql)
		count = cursor.rowcount
		return count
		
	except Exception as e:
		connect.rollback()
		print('Delete Exception:', e)
	finally:
		cursor.close()
		connect.commit()
	

def write2csv(csvname, buffer=None, csvpath=os.getcwd()):
	"""
	创建一个新的csv文件用于备份数据库表格数据
	
		csvpath: 备份csv文件存放路径，默认为当前路径
		csvname: 备份csv文件名
		buffer: list 传递写入的内容
	"""
	
	filename = isFile(csvname, csvpath)
	
	# with open(csvpath, 'a', newline='') as cf: # open路径而不是文件就会出现：Permission denied: 'C:\\Users\\admin\\Desktop\\router'
	with open(filename, 'a', newline='') as cf:
		writer = csv.writer(cf)
		# writer.writerow(title)
		writer.writerows(buffer)
		# for item in buffer:
		#	writer.writerow(item)
	


def readcsv(csvname, csvpath=os.getcwd()):
	"""
	读取csv文件数据
	
		csvpath: csv文件路径
		csvname: csv文件名
		
		return: 返回读取内容
	"""
	
	
	buffer=[]
		
	filename = isFile(csvname, csvpath)
	if os.path.exists(filename):
		with open(filename, 'r') as cf:
			reader = csv.reader(cf)
			for item in reader:
				buffer.append(item)
				
	return buffer


def _test():
	"""
	$@#$@%@$%@$%@#
	"""
	
	path = input('.“Enter”使用当前路径.\n.输入数据库文件的路径亦可:/.../somewhere/\n')
	dbname = input('输入数据库名:something.db\n')
	tablename = input('输入数据库表名：tablename\n')
	today = time.strftime('%Y%m%d%H%M%S')
	csvpath = input('csv文件路径\n')
	csvname = input('csv文件名\n')
	filepath = ''
	
	if '' is path:
		filepath = isFile(dbname)
	else:
		filepath = isFile(dbname, path)
		
	if filepath.endswith('.db') and os.path.isfile(filepath):
		try:
		
			# 打开数据库，建立连接
			connect = sqlite3.connect(dbname)
			#fetchone = Query(connect, tablename, True)
			# 查询数据
			fetchall = Query(connect, tablename)

			print('数据库表%s查询到%s条数据。'%(tablename, len(fetchall)))
			# 备份表数据,保存为csv文件
			csvbak = '%s_%s.csv'%(tablename, today)
			if '' is csvpath:
				write2csv(csvbak, fetchall)
			else:
				write2csv(csvbak, fetchall, csvpath)
			
			if '' is not csvname:
				# 删除数据库表数据
				count = Delete(connect, tablename)
				print('删除%s中%s条数据'%(tablename, count))
			
				# 读取csv数据，插入到数据库
			
				if '' is csvpath:
					insertdata = readcsv(csvname)
				else:
					insertdata = readcsv(csvpath,csvname)
			
						
				if Insert(connect, tablename, insertdata):
					print('成功插入数据')
				
		except Exception as e:
			print('test Exception：', e)
		finally:
			# 断开数据库连接
			connect.close()


if __name__ == '__main__':
	_test()