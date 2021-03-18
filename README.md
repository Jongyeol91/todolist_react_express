#### 작성자: 박종열
#### 작성일: 2021-03-18

## 실행 방법

실행 전 설정   
- npm install 명령어를 통하여 노드 모듈 설치

client   
 - 실행위치: root  
 - 싱행 명령어: npm run start-front
 
 server  
 - 실행 위치: root  
 - 실행 명령어: npm run start-server
 
### 구현내용
- 투두리스트 read, create, delete, complete
- 투두리스트 간의 참조 
  - 복수 참조시 아이디 입력을 콤마로 구분 ex) 1,2
  - 부모 할일 완료 이전에 자식 할일 완료 불가 
- 페이지 네이션

### 미구현 및 미사용 기술
- 투두리스트 수정
- 전역적으로 사용되는 함수나 변수가 없기에 리덕스와 같은 전역 state 툴을 별도로 사용하지 않았음