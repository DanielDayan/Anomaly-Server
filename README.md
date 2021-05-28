# Anomaly Server Detection



# Anomaly Server node js project
## 

Anomaly Server was written in node.js technolgy using express server template




## Features

- Connect to our Anomaly Detection server on localhost::8080
- Upload your own CSV files data of flight , one for train our model , and the other to detect the anomalies of the flight
- Choose your detect algorithm :
 Linear Regression Detector , or , Minimum Circle Detector and submit your choice
- Click on the Detect button in order to run the detect algorithm you chose
- See the anomlies detected by our server in the frame located in the bottom of the screen
- You can also send Post http request at localhost:8080/detect to get the result as JSON object







## Running
(instructions written for Windows users)

requirements : Node.js 

you can download it from : https://nodejs.org/en/

After installing node js , you can download files as zip or git clone the project to your own PC

When all of the files located in your PC open the CMD windows (command line prompt) and change the directory to your-downloaded-path/AnomalyServer/bin

example :


![screenshoit](https://user-images.githubusercontent.com/64739791/119964278-b7e09f00-bfb1-11eb-917a-3a29bfc76b70.png)

When all set up , and you are in the current directory use the command :

```bash
npm install
```
after it finished installing all the required npm's use command

```bash
node www
```
now server is running ! , open your browser at 

```bash
localhost:8080
```
upload your files (provided examples for your use at files_csv) 
chose your algorithm (simple / hybrid ) and submit
and click on Detect 
you can see the results below

 NOTICE : we assumed CSV files comes with first line name of the features .

for running example you can use follwing files provided insise main branch git under files_csv directory: 

* reg_flight.csv - for learn file
* anomaly_flight.csv - for detect file
or 

* train.csv - for learn file
* test.csv - for detect file

## npm  -

In our development of Anomaly-Detection-Server
we used the following npm
smallest-enclosing-circle - used in minimum circle algorithm
alert - used when error occured ( such as no csv uploaded) 


| npm | Link |
| ------ | ------ |
| smallest-enclosing-circle |https://www.npmjs.com/package/smallest-enclosing-circle |
| alert | https://www.npmjs.com/package/alert



# UML Diagram 

![alt text](uml.jpeg)

# Video 



that all for now see you in next version update !

* Current Version 1.0 








