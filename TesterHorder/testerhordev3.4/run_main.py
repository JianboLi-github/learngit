#coding:utf-8
import unittest
import HTMLTestRunner
import os,time

#执行用例并生成测试报告
#加载用例
#执行用例
#生成测试报告

def add_case(case_path,rule):
	testunit = unittest.TestSuite()
	discover = unittest.defaultTestLoader.discover(
		case_path,
		pattern = rule,
		top_level_dir = None)
	testunit.addTests(discover)	#直接加载discover
	#return discover
	
	return testunit
	
	
def run_case(all_case,report_path):
	'''执行所有的测试用例，并把结果写入测试报告'''
	now = time.strftime('%Y_%m_%d %H.%M.%S')
	report_abspath = os.path.join(report_path,now+'_result.html')
	
	fp = open(report_abspath,'wb')
	runner = HTMLTestRunner.HTMLTestRunner(
		stream=fp,
		title='testerhorde自动化测试报告，测试结果如下：',
		description='用例执行情况：')
		
	#调用add_case函数返回值
	runner.run(all_case)
	fp.close()
	
if __name__ == '__main__':
	case_path = os.path.join(os.getcwd(),'testcase')
	
	rule = 'test*.py'	#测试用例加载规则
	all_case = add_case(case_path,rule)	#加载测试用例
	#print(all_case)
	
	report_path = os.path.join(os.getcwd(),'report')
	run_case(all_case,report_path)
	
	
	