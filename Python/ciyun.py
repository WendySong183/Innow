#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import jieba
import stylecloud
from IPython.display import Image 
import tkinter as tk
from tkinter import *
from PIL import Image,ImageTk

# 定义分词函数
def get_cut_words(content_series):
    # 读入停用词表
    stop_words = [] 
    
    with open("/Users/nika/Downloads/stop_words.txt", 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines:
            stop_words.append(line.strip())


    # 自定义停用词
    my_stop_words = ['真的', '这部', '这是', '一种', '那种',
                    '哈哈哈']   
    stop_words.extend(my_stop_words)               

    # 分词
    word_num = jieba.lcut(content_series.str.cat(sep='。'), cut_all=False)

    # 条件筛选
    word_num_selected = [i for i in word_num if i not in stop_words and len(i)>=2]
    
    return word_num_selected

#绘制词云图
def get_cloud(df,name,kind,color):
    text_cut = get_cut_words(df.content[df.content.str.contains(name)])
    stylecloud.gen_stylecloud(text=' '.join(text_cut), 
                          collocations=False,
                          font_path='/Library/Fonts/Songti.ttc',
                          icon_name=kind,#图形选择
                          palette=color,#颜色选择
                          size=653,
                          output_name=name+'.png')
    
    
    
def main():
    #设置tkinter窗口
    root = Tk()
    root.title('词云')
    root.geometry('800x800')
    #绘制两个label,grid（）确定行列
    Label(root,text="请输入文件地址：").grid(row = 0,column =0)
    Label(root,text="请输入主角名字（多个名字请用|隔开）：").grid(row = 1,column =0)
    Label(root,text="请输入图形形状（https://fa5.dashgame.com/）：").grid(row = 2,column =0)
    Label(root,text="请输入颜色（https://jiffyclub.github.io/palettable/）：").grid(row = 3,column =0)

    global img
    #导入两个输入框
    e1 = Entry(root)
    e2 = Entry(root)
    e3 = Entry(root)
    e4 = Entry(root)

    #设置输入框的位置
    e1.grid(row =0 ,column =1)
    e2.grid(row =1 ,column =1)
    e3.grid(row =2 ,column =1)
    e4.grid(row =3 ,column =1)

    #输入内容获取函数print打印
    def show():
        url=e1.get()
        df=pd.read_excel(url)
        df['content'] = df.contents.astype('str')
        name=e2.get()
        kind='fas fa-'+e3.get()
        color=e4.get()
        get_cloud(df,name,kind,color)

        img_open = Image.open(name+'.png')
        img=ImageTk.PhotoImage(img_open)
        imglabel = Label(root, image=img)
        imglabel.grid(row=7, column=0, columnspan=3)

    #清除函数，清除输入框的内容
    def dele():
        e2.delete(0,END)
        e3.delete(0,END)
        e4.delete(0,END)
    #设置两个按钮，点击按钮执行命令 command= 命令函数
    theButton1 = Button(root, text ="获取图片", width =10,command =show)
    theButton2 = Button(root, text ="清除",width =10,command =dele)
    #设置按钮的位置行列及大小
    theButton1.grid(row =4 ,column =0,sticky =W, padx=10,pady =5)
    theButton2.grid(row =4 ,column =1,sticky =E, padx=10,pady =5)

    mainloop()

    
if __name__ == '__main__':
    main()


# In[ ]:




