<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="weui_search_bar" id="search_bar">
        <div class="weui_search_inner">
          <i class="weui_icon_search" style="background-color:#FFFFFF;margin-top:2px;padding-bottom:-2px;margin-bottom:-2px;padding-right:6px;padding-left:12px;margin-left:-12px"></i>
          <input type="search" class="weui_search_input" id="search_input" style="background-color:#FFFFFF;padding-right:22px;" placeholder="受理编号或身份证号" required/>
          <a href="javascript:" class="weui_icon_clear" id="search_clear"></a>
        </div>
    <style>
    a:link {
        color: #09BB07;
        background-color: transparent;
        text-decoration: none;
    }
    a:visited {
        color: #09BB07;
        background-color: transparent;
        text-decoration: none;
    }
    a:hover {
        color: #09BB07;
        background-color: transparent;
        text-decoration: none;
    }
    a:active {
        color: #09BB07;
        background-color: transparent;
        text-decoration: none;
    }
    a {
        line-height: 28px;
        display: block;
    }
    </style>
    <a href="javascript:" onclick="searchFunction()" id="mySearch" >搜</a>
    <a href="javascript:" onclick="searchFunction()" id="mySearch2" >索</a>
      <script>
          function searchFunction() {
              var x = document.getElementById("search_input").value;
              var txt = "<%=_Data%>"

              var parser = new DOMParser();
              var xmlDoc = parser.parseFromString(txt, "text/xml");
              var i = 0

              while (i < xmlDoc.childNodes[0].childElementCount) {
                  if (xmlDoc.childNodes[0].childNodes[i].childNodes[0].childNodes[0].nodeValue == x) {
                      document.getElementById("xcode").value = xmlDoc.childNodes[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
                      document.getElementById("type").value = xmlDoc.childNodes[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
                      document.getElementById("name").value = xmlDoc.childNodes[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
                      if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[0].childNodes[2].childNodes[0].nodeValue == "complete") {
                          document.getElementById("s1").className = "steps-complete";
                          document.getElementById("d1").className = "steps-description";
                          document.getElementById("d1").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[0].childNodes[3].childNodes[0].nodeValue;
                          } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[0].childNodes[2].childNodes[0].nodeValue == "progress") {
                              document.getElementById("s1").className = "steps-progress";
                              document.getElementById("d1").className = "steps-description";
                              document.getElementById("d1").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[0].childNodes[3].childNodes[0].nodeValue;
                          } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[0].childNodes[2].childNodes[0].nodeValue == "incomplete") {
                              document.getElementById("s1").className = "steps-name";
                              document.getElementById("d1").className = "steps-unknown";
                      }
                      if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[1].childNodes[2].childNodes[0].nodeValue == "complete") {
                          document.getElementById("s2").className = "steps-complete";
                          document.getElementById("d2").className = "steps-description";
                          document.getElementById("d2").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[1].childNodes[3].childNodes[0].nodeValue;
                      } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[1].childNodes[2].childNodes[0].nodeValue == "progress") {
                          document.getElementById("s2").className = "steps-progress";
                          document.getElementById("d2").className = "steps-description";
                          document.getElementById("d2").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[1].childNodes[3].childNodes[0].nodeValue;
                      } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[1].childNodes[2].childNodes[0].nodeValue == "incomplete") {
                          document.getElementById("s2").className = "steps-name";
                          document.getElementById("d2").className = "steps-unknown";
                      }                                
                      if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[2].childNodes[2].childNodes[0].nodeValue == "complete") {
                          document.getElementById("s3").className = "steps-complete";
                          document.getElementById("d3").className = "steps-description";
                          document.getElementById("d3").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[2].childNodes[3].childNodes[0].nodeValue;
                      } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[2].childNodes[2].childNodes[0].nodeValue == "progress") {
                          document.getElementById("s3").className = "steps-progress";
                          document.getElementById("d3").className = "steps-description";
                          document.getElementById("d3").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[2].childNodes[3].childNodes[0].nodeValue;
                      } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[2].childNodes[2].childNodes[0].nodeValue == "incomplete") {
                          document.getElementById("s3").className = "steps-name";
                          document.getElementById("d3").className = "steps-unknown";
                      }
                      if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[3].childNodes[2].childNodes[0].nodeValue == "complete") {
                          document.getElementById("s4").className = "steps-complete";
                          document.getElementById("d4").className = "steps-description";
                          document.getElementById("d4").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[3].childNodes[3].childNodes[0].nodeValue;
                      } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[3].childNodes[2].childNodes[0].nodeValue == "progress") {
                          document.getElementById("s4").className = "steps-progress";
                          document.getElementById("d4").className = "steps-description";
                          document.getElementById("d4").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[3].childNodes[3].childNodes[0].nodeValue;
                      } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[3].childNodes[2].childNodes[0].nodeValue == "incomplete") {
                          document.getElementById("s4").className = "steps-name";
                          document.getElementById("d4").className = "steps-unknown";
                      }
                      if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[4].childNodes[2].childNodes[0].nodeValue == "complete") {
                          document.getElementById("s5").className = "steps-complete";
                          document.getElementById("d5").className = "steps-description";
                          document.getElementById("d5").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[4].childNodes[3].childNodes[0].nodeValue;
                      } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[4].childNodes[2].childNodes[0].nodeValue == "progress") {
                          document.getElementById("s5").className = "steps-progress";
                          document.getElementById("d5").className = "steps-description";
                          document.getElementById("d5").innerHTML = xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[4].childNodes[3].childNodes[0].nodeValue;
                      } else if (xmlDoc.childNodes[0].childNodes[i].childNodes[3].childNodes[4].childNodes[2].childNodes[0].nodeValue == "incomplete") {
                          document.getElementById("s5").className = "steps-name";
                          document.getElementById("d5").className = "steps-unknown";
                      }
                  }
                  i += 1
              }
          }
     </script>
    </div>
    <script src="/Scripts/jquery-2.1.4.js"></script>
<script src="/Scripts/jquery-weui.js"></script>
    <div class="weui_cells weui_cells_form">
  <div class="weui_cell">
    <div class="weui_cell_hd"><label class="weui_label">受理编号</label></div>
    <div class="weui_cell_bd weui_cell_primary">
      <input class="weui_input" type="tel" id="xcode" placeholder="受理编号">
    </div>
  </div>
  <div class="weui_cell">
    <div class="weui_cell_hd"><label class="weui_label">业务类型</label></div>
    <div class="weui_cell_bd weui_cell_primary">
      <input class="weui_input" type="tel" id="type" placeholder="业务类型">
    </div>
  </div>
    <div class="weui_cell">
    <div class="weui_cell_hd"><label class="weui_label">案卷名称</label></div>
    <div class="weui_cell_bd weui_cell_primary">
      <input class="weui_input" type="tel" id="name" placeholder="案卷名称">
    </div>
  </div>
</div>

<section id="Steps" class="steps-section">

    <h3 class="steps-header">
      办理流程
    </h3>

  <div class="steps-timeline">

    <div class="steps-one">
      <h3 class="steps-name" id="s1">
          受理
      </h3>
      <img class="steps-img" src="/text.png" alt="" />
      <p class="steps-unknown" id="d1">
        TBD
      </p>
    </div>

    <div class="steps-two">
      <h3 class="steps-name" id="s2">
          审核
        </h3>
      <img class="steps-img" src="/text.png" alt="" />
      <p class="steps-unknown" id="d2">
        TBD
      </p>
    </div>

    <div class="steps-two">
      <h3 class="steps-name" id="s3">
          登簿
        </h3>
      <img class="steps-img" src="/text.png" alt="" />
      <p class="steps-unknown" id="d3">
        TBD
      </p>
    </div>

    <div class="steps-two">
      <h3 class="steps-name" id="s4">
          缮证
        </h3>
      <img class="steps-img" src="/text.png" alt="" />
      <p class="steps-unknown" id="d4">
        TBD
      </p>
    </div>

    <div class="steps-three">
      <h3 class="steps-name" id="s5">
          办结
        </h3>
      <img class="steps-img" src="/text.png" alt="" />
      <p class="steps-unknown" id="d5">
        TBD
      </p>
     </div>
    </div>
</section>
        
</asp:Content>