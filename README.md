#### 작성자: 박종열
#### 작성일: 2021-03-18

## 실행 방법

실행 전 설정   
npm install 명령어를 통하여 노드 모듈 설치

client   
 실행위치: root  
 싱행 명령어: npm run start
 
 server  
 실행 위치: server/  
 실행 명령어: node server.js
 
## 구현내용
- 투두리스트 read, create, delete, complete
- 투두리스트 간의 참조 
  - 복수 참조시 아이디 입력을 콤마로 구분 ex) 1,2
  - 부모 할일 완료 이전에 자식 할일 완료 불가 
- 페이지 네이션

## 미구현
- 투두리스트 수정