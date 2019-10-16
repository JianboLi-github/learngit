#coding=utf-8
import unittest,time

class Test(unittest.TestCase):
	'''测试demo'''
	def setUp(self):
		print("start!")
	def tearDown(self):
		print('end!')
	def test001(self):
		'''测试登录用例，账号：xx密码xxxx'''
		print('执行测试用例001')
	
	def test003(self):
		'''测试登录用例，账号：xx密码xxxx'''
		print('执行测试用例003')
		
	def test002(self):
		'''测试登录用例，账号：xx密码xxxx'''
		print('执行测试用例002')
	def test005(self):
		print('执行测试用例005')
if __name__ == '__main__':
	unittest.main()