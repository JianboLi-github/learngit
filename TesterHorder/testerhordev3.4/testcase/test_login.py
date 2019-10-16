#coding:utf-8
from selenium import webdriver
import ddt,time
import unittest
import os

#导入自定义模块
import myExcel	
from Login import Login_Horde


'''导入测试数据，logindata.xlsx存放username和password '''
filepath = os.path.join(os.getcwd(),'testcase\logindata.xlsx')	#相对路径

sheetName = 'Sheet1'
data = myExcel.ExcelUtil(filepath,sheetName)
testData = data.dict_data()

#用unittest的装饰器@classmethod修饰测试用例的前置和后置
#避免在执行测试用例的时候多次打开关闭浏览器，提高代码执行效率
@ddt.ddt
class Test(unittest.TestCase):
	'''	数据驱动设计模式测试用例'''			
	@classmethod
	def setUpClass(cls):
		'''打开浏览器Firefox'''
		cls.driver = webdriver.Firefox()
		url = 'http://www.testerhorde.com'
		cls.driver.get(url)
		#添加隐式等待10s
		cls.driver.implicitly_wait(10)		
		
	@classmethod
	def tearDownClass(cls):
		cls.driver.quit()
	
	@ddt.data(*testData)
	def test_login(self,data):	#函数名：test_*
		'''登录模块测试用例'''
		try:
			#print('当前测试用户名：%s'%data['username'])			
			#调用登录模块方法
			mylogin = Login_Horde(self.driver)
			mylogin.login(data['username'],data['password'])
			result,msg = mylogin.is_login_sucess()
			
			if result:
				mylogin.logout()	#登录成功，注销用户
			else:
				mylogin.click_close()	#登录失败，关闭登录对话框
			self.assertTrue(result,msg)
		except Exception as msg:
			#断言失败。截屏
			nowTime = time.strftime('%Y%m%d_%H.%M.%S')
			self.driver.get_screenshot_as_file('Screenshots\\%s.png'%nowTime)
			#path = os.path.join(os.getcwd(),'report')
			#self.driver.get_screenshot_as_file(r'%s\%s.png'%(path,now))
			#print('截屏%s'%path)
			
			
if __name__ == '__main__'	:
	unittest.main()