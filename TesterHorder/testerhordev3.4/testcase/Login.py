#coding:utf-8
from selenium.webdriver.support.wait import WebDriverWait

'''登录类,登录中包含登录方法'''
class Login_Horde():
	'''登录类封装'''
	def __init__(self,driver):
		'''初始化driver参数'''
		self.driver = driver
	
	def login(self,username,password):
		'''登录方法，账号密码参数化'''
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('css selector','button.widget-button:nth-child(2)')).click()
		self.input_user(username)
		self.input_password(password)
		self.click_login_button()
		
		
	def input_user(self,username):
		'''输入用户名'''
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('id','login-account-name')).clear()	
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('id','login-account-name')).send_keys(username)
			
	def input_password(self,password):
		'''输入密码'''
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('id','login-account-password')).clear()
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('id','login-account-password')).send_keys(password)
			
	def click_login_button(self):
		'''点击登录按钮'''
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('css selector','button.btn-large:nth-child(1)')).click()
	
	def click_close(self):
		'''关闭登录对话框'''
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('css selector','.fa-times')).click()
	
	def logout(self):
		'''退出登录'''
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('css selector','li.current-user>a>div>img')).click()
		WebDriverWait(self.driver,5).until(lambda x:x.find_element\
			('css selector','.logout > span')).click()
			
	def is_login_sucess(self):
		'''判断是否登录成功'''
		try:
			title = self.driver.find_element('css selector','li.current-user>a>div>img')\
				.get_attribute('title')
			#print('%s成功登录'%title)
			return True,None
			
		except Exception as msg:
			#print('异常原因：%s'%msg)
			return False,('异常原因:%s'%msg)