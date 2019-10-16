#-*- coding=utf -8-*-
import xlrd	#第三方库

'''定义的类返回一个list，list由几个字典组成'''
class ExcelUtil():

	'''需要传入excle表格的路径和工作表名'''
	def __init__(self,excelPath,sheetName):
		'''读取excel文件'''
		try:
			self.data = xlrd.open_workbook(excelPath)			
		except Exception as msg:	
			raise msg
		#通过工作表名获取工作表
		self.table = self.data.sheet_by_name(sheetName)
		
		#获取excle第一行作为dic的key
		self.keys = self.table.row_values(0)
		#获取数据总行数
		self.rowNum = self.table.nrows
		#获取数据总列数
		self.colNum = self.table.ncols
		
	def dict_data(self):
		'''装载list'''
		if self.rowNum <= 1:
			print('excel总行数小于1，没有存放数据')
		else:
			result = []
			row = 1
			for i in range(self.rowNum - 1):
				temp = {}
				#按行读取数据，组成一个字典
				values = self.table.row_values(row)
				for x in range(self.colNum):
					temp[self.keys[x]] = values[x]
				result.append(temp)
				row += 1
			return result
					
		