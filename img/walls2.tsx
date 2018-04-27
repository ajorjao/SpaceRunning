<?xml version="1.0" encoding="UTF-8"?>
<tileset name="walls2" tilewidth="64" tileheight="64" tilecount="20" columns="5">
 <image source="walls2.png" width="320" height="256"/>
 <tile id="0">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.909091" y="0.545455">
    <polyline points="0,0 39.4545,0 20.5455,8.36364 7.63636,20.9091 -0.363636,40.5455 -0.363636,0.181818"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="1">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.545455" y="0.545455">
    <polygon points="0,0 60,0 0.363636,60"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.727273" y="0.545455">
    <polyline points="0,0 61.6364,0 60,16.7273 49.6364,36.5455 36.3636,50.1818 20.9091,58 0,61.6364 -0.181818,0.181818"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="3">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.545455" y="0.363636" width="62.9091" height="63.2727"/>
  </objectgroup>
 </tile>
 <tile id="4">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="obstacles" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="31.6364" y="17.0909">
    <polygon points="0,0 32,-16.7273 31.8182,15.6364"/>
   </object>
   <object id="2" x="31.6364" y="48.1818">
    <polygon points="0,0 31.2727,-15.4545 32,15.0909"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="5">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.181818" y="23.2727">
    <polyline points="0,0 7.63636,18.3636 19.0909,30.7273 37.6364,40 0.727273,40.3636 0,0.545455"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="6">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.363636" y="63.2727">
    <polygon points="0,0 0,-60.3636 59.8182,0.181818"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="7">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.727273" y="63.0909">
    <polyline points="0,0 -0.363636,-61.2727 17.6364,-58.9091 33.4545,-51.0909 48.9091,-36.3636 58.1818,-19.6364 61.2727,0.363636 0.727273,0.363636"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="8">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="obstacles" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.181818" y="63.2727">
    <polygon points="0,0 16.5455,-31.8182 32.1818,0.181818"/>
   </object>
   <object id="2" x="63.6364" y="63.2727">
    <polygon points="0,0 -16.3636,-32 -31.6364,0.181818"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="10">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="24" y="0.545455">
    <polyline points="0,0 18.7273,7.63636 30.5455,20.3636 38.5455,38.1818 39.4545,0.181818 0.727273,0"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="11">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="2.72727" y="0.363636">
    <polygon points="0,0 60.9091,0 61.0909,60.7273"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="12">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="1.27273" y="0.545455">
    <polyline points="0,0 3.81818,22.7273 13.8182,38 26.5455,49.8182 45.6364,59.4545 62,60.5455 62.1818,0.181818 0.545455,0.181818"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="13">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="obstacles" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="31.6364" y="0.545455">
    <polygon points="0,0 -31.4545,0.181818 -15.0909,32.1818"/>
   </object>
   <object id="2" x="63.2727" y="0.363636">
    <polygon points="0,0 -31.4545,0.181818 -15.8182,32.9091"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="15">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="21.0909" y="63.0909">
    <polyline points="0,0 21.2727,-8.18182 33.0909,-20.1818 42.1818,-40.7273 42.5455,0.181818 0.363636,0.545455"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="16">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.909091" y="63.8182">
    <polygon points="0,0 62.7273,-61.8182 62.5455,-0.181818"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="17">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="63.2727" y="0.727273">
    <polyline points="0,0 -22.7273,4.36364 -38.5455,14.1818 -50,26 -58.3636,42.1818 -62.1818,62.7273 0,62.7273 0,0"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="18">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="obstacles" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <object id="1" x="0.181818" y="0.545455">
    <polygon points="0,0 32,16 0.181818,32.9091"/>
   </object>
   <object id="2" x="0.545455" y="63.8182">
    <polygon points="0,0 31.2727,-15.8182 -0.181818,-31.2727"/>
   </object>
  </objectgroup>
 </tile>
</tileset>
