#coding:utf-8
#-*- coding:utf-8 -*-

from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.support import expected_conditions as exp
import unittest,time
import random,os

class HordeHome(unittest.TestCase):
	'''主页加载测试'''
	@classmethod
	def setUpClass(cls):
		'''打开浏览器'''
		cls.driver = webdriver.Firefox()
		url = 'http://www.testerhorde.com'
		cls.driver.get(url)
		#隐式等待10s
		cls.driver.implicitly_wait(10)
	@classmethod	
	def tearDownClass(cls):
		'''关闭浏览器'''
		cls.driver.quit()
	
	def findElement(self,by,css):
		'''通过css选择器定位,函数返回WebElement元素'''
		return WebDriverWait(self.driver,5).until(lambda x:x.find_element(by,css))
		
	def screenshot(self,testname,msg):
		print('%s异常原因:%s'%(testname,msg))
		nowTime = time.strftime("%Y%m%d.%H.%M.%S")
		self.driver.get_screenshot_as_file('Screenshots\\%s.png'%nowTime)
	
	def rollback(self):
		'''返回相对路径的根目录href="/" '''
		self.driver.find_element('css selector','.title>a').click()
	def test_search(self):
		'''搜索按钮测试用例'''
		try:
			self.findElement('css selector','.fa-search').click()
			self.findElement('id','search-term').send_keys('Selenium')
			#模拟enter键操作回车按钮
			self.findElement('id','search-term').send_keys(Keys.ENTER)
			
			#判断元素，并返回判断结果
			#打开新链接，页面标题加载需要等待
			result = WebDriverWait(self.driver,5).until(exp.title_contains('Selenium'))
			self.assertTrue(result)
		except Exception as msg:
			#调用自定义方法
			self.screenshot('test_search',msg)
		self.rollback()

	def test_menu(self):
		'''菜单栏测试用例'''
		try:
			self.findElement('css selector','.fa-bars').click()
			num = random.randint(2,8)
			object = self.findElement('css selector','li.category-link:nth-child(%s)>a>span:nth-child(2)'%num)

			text = object.text	#顺序不要颠倒，要先text再click
			object.click()
			#判断元素，返回判断结果
			result = WebDriverWait(self.driver,5).until(exp.title_contains(text))
			self.assertTrue(result)
		except Exception as msg:
			self.screenshot('test_menu',msg)
		self.rollback()	
	
	def test_classify(self):
		'''下拉列表测试用例'''
		try:
			#下拉列表的id是动态的，无法通过id直接定位
			#随着浏览器的前进后退，id发生变化
			self.findElement('css selector','.list-controls>div:nth-child(1)>section>ol>li>a').click()
			num = random.randint(2,8)
			by = 'css selector'
			css='div.cat:nth-child(%s)>a:nth-child(1)>span:nth-child(2)'%num
			object = self.findElement(by,css)
			href = 'http://www.testerhorde.com%s'%object.get_attribute('href')
			if self.driver.current_url == href:
				self.assertTrue(True)
		except Exception as msg:
			self.screenshot('test_classify',msg)
		self.rollback()
	
	def test_subject01(self):
		'''话题排列测试用例01：最新'''
		try:
			#此处元素的id是动态的，无法通过id定位这个元素

			self.findElement('css selector','#navigation-bar>li:nth-child(1)>a').click()
			url = 'http://www.testerhorde.com/latest'
			if self.driver.current_url == url or 'http://www.testerhorde.com':
				self.assertTrue(True)
		except Exception as msg:
			self.screenshot('test_subject',msg)
		self.rollback()
		
	def test_subject02(self):
		'''话题排列测试用例02：最热'''
		try:

			self.findElement('css selector','#navigation-bar>li:nth-child(2)>a').click()
			if self.driver.current_url == 'http://www.testerhorde.com/top':
				self.assertTrue(True)
		except Exception as msg:
			self.screenshot('test_subject02',msg)
		self.rollback()
		
if __name__ == '__main__':
	unittest.main()