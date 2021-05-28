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







## Installation






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

![alt text](url)

# Video 



that all for now see you in next version update !

* Current Version 1.0 








