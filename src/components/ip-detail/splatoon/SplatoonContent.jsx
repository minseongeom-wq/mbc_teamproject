import { useEffect, useRef, useState } from 'react';
import Navigation from '../../common/navigation/Navigation';
import NintendoFooter from '../../layout/NintendoFooter';
import useDesignScale from '../../../hooks/useDesignScale';
import './style.css';
import AppLink from '../../common/AppLink';
import { navigationRoutes } from '../../common/navigation/navigationLinks';
import { weapons } from './splatoonData';

const imgB03De537Fcb94Fa29031C0F3Bfe360513 = new URL('./assets/3a9de.png', import.meta.url).href;
const imgImage1201 = new URL('./assets/b276c.png', import.meta.url).href;
const imgF7F40Ea364B2469B8Fb6E403278C26161 = new URL('./assets/34417.png', import.meta.url).href;
const imgImage1208 = new URL('./assets/b669d.png', import.meta.url).href;
const imgC0423173E64A4Ca6B3180D5Cdd3C18761 = new URL('./assets/f67e8.png', import.meta.url).href;
const imgImage1080 = new URL('./assets/2e1a4.png', import.meta.url).href;
const img83A393BcEf58465B93F70D326A66B6491 = new URL('./assets/3975c.png', import.meta.url).href;
const imgImage1221 = new URL('./assets/9499c.png', import.meta.url).href;
const imgLogo1 = new URL('./assets/9b8f1.png', import.meta.url).href;
const img = new URL('./assets/222a5.png', import.meta.url).href;
const imgImage1157 = new URL('./assets/d0f08.png', import.meta.url).href;
const imgRectangle2189 = new URL('./assets/321cd.png', import.meta.url).href;
const img565821Cf3A824337Aad9Bdc96719C5A41 = new URL('./assets/0a9e4.png', import.meta.url).href;
const imgDownload2 = new URL('./assets/b8873.png', import.meta.url).href;
const imgDownload1 = new URL('./assets/ef008.png', import.meta.url).href;
const imgDownload3 = new URL('./assets/e003f.png', import.meta.url).href;
const img467Bef5924B84459A529C229Efa711851 = new URL('./assets/42855.png', import.meta.url).href;
const imgImage1096 = new URL('./assets/b1bca.png', import.meta.url).href;
const img7F0E83Df7138442CA5F5Bdcb3E7818462 = new URL('./assets/6ce8c.png', import.meta.url).href;
const imgImage1078 = new URL('./assets/55c2f.png', import.meta.url).href;
const imgImage1190 = new URL('./assets/7cbdf.png', import.meta.url).href;
const img6B601F96E1E6466EB2D10C6335C1D02A2 = new URL('./assets/87eae.png', import.meta.url).href;
const imgImage1191 = new URL('./assets/6188c.png', import.meta.url).href;
const img0102A229Df6D43A6B1Da448B8340F9Da2 = new URL('./assets/6871d.png', import.meta.url).href;
const imgImage1192 = new URL('./assets/f87bc.png', import.meta.url).href;
const img950Dc38D204E4Af083C0D6Aae042A2D22 = new URL('./assets/96b81.png', import.meta.url).href;
const imgImage1185 = new URL('./assets/ad161.png', import.meta.url).href;
const imgBeeeed74B0D84005A448B337Ec4Dedf92 = new URL('./assets/77eeb.png', import.meta.url).href;
const img63D6968030D048Ae951E852Fa14D9E491 = new URL('./assets/ba788.png', import.meta.url).href;
const imgImage1162 = new URL('./assets/c66e0.png', import.meta.url).href;
const imgImage1077 = new URL('./assets/49917.png', import.meta.url).href;
const imgImage1165 = new URL('./assets/38cbe.png', import.meta.url).href;
const imgDf46Cb3207964Ae094Ce9Cf00A6E4F681 = new URL('./assets/d6513.png', import.meta.url).href;
const imgImage1160 = new URL('./assets/dea2f.png', import.meta.url).href;
const imgImage1166 = new URL('./assets/b57d8.png', import.meta.url).href;
const img89255E44821B4A53923EFffe2976Fbbf1 = new URL('./assets/21b33.png', import.meta.url).href;
const img1 = new URL('./assets/7b648.png', import.meta.url).href;
const imgEf3Ed2Ea2Bb740D6Acef0Fae5Cd1B9F01 = new URL('./assets/272c0.png', import.meta.url).href;
const img24Ba743387Ff4B439C6704A48Eca40Db1 = new URL('./assets/b8416.png', import.meta.url).href;
const img5Fa0D08DC29649E5Aceb4D4C218961Df1 = new URL('./assets/13b91.png', import.meta.url).href;
const img546866806D08444FA76C96Ea2C9Fd1E71 = new URL('./assets/f1876.png', import.meta.url).href;
const img773668Ce62F14E90A64DC5F1Ad4Ff2Eb1 = new URL('./assets/9890f.png', import.meta.url).href;
const img2 = new URL('./assets/ede95.png', import.meta.url).href;
const img63E1D4278B5143109Aad3E7E51909C3F1 = new URL('./assets/aad19.png', import.meta.url).href;
const imgImage1079 = new URL('./assets/ae3c9.png', import.meta.url).href;
const imgE029A8A7697C4F9D878241145C5F2Ea12 = new URL('./assets/02c24.png', import.meta.url).href;
const imgImage1087 = new URL('./assets/5bf9d.png', import.meta.url).href;
const imgBtnFes1 = new URL('./assets/de836.png', import.meta.url).href;
const imgBtnSalmon1 = new URL('./assets/98756.png', import.meta.url).href;
const imgBtnHero1 = new URL('./assets/fc804.png', import.meta.url).href;
const imgBtnBattle1 = new URL('./assets/453f2.png', import.meta.url).href;
const imgBtnAmiibo1 = new URL('./assets/c5b65.png', import.meta.url).href;
const imgBtnApp1 = new URL('./assets/aec79.png', import.meta.url).href;
const imgBtnIka1 = new URL('./assets/b3177.png', import.meta.url).href;
const imgImage1083 = new URL('./assets/e4c2b.png', import.meta.url).href;
const imgDa1De45BDfe64Ae5866F7Dbf345462433 = new URL('./assets/a9452.png', import.meta.url).href;
const img801Ee8A59A314465Babf56Bafd6036A01 = new URL('./assets/e358f.png', import.meta.url).href;
const imgImages1 = new URL('./assets/bf565.png', import.meta.url).href;
const imgRectangle2196 = new URL('./assets/1aaec.svg', import.meta.url).href;
const imgRectangle2200 = new URL('./assets/65495.svg', import.meta.url).href;
const imgRectangle2201 = new URL('./assets/b04ea.svg', import.meta.url).href;
const imgRectangle2197 = new URL('./assets/92a34.svg', import.meta.url).href;
const imgRectangle2199 = new URL('./assets/43f60.svg', import.meta.url).href;
const imgEllipse1 = new URL('./assets/f33cc.svg', import.meta.url).href;
const imgRectangle2180 = new URL('./assets/f1aff.svg', import.meta.url).href;
const imgRectangle2175 = new URL('./assets/6c7b4.svg', import.meta.url).href;
const imgRectangle2176 = new URL('./assets/7b2eb.svg', import.meta.url).href;
const imgRectangle2177 = new URL('./assets/a0599.svg', import.meta.url).href;
const imgRectangle2178 = new URL('./assets/bdbb7.svg', import.meta.url).href;
const imgRectangle2179 = new URL('./assets/4ab08.svg', import.meta.url).href;
const imgRectangle2181 = new URL('./assets/67c20.svg', import.meta.url).href;
const imgRectangle2182 = new URL('./assets/61118.svg', import.meta.url).href;
const imgRectangle2195 = new URL('./assets/18717.svg', import.meta.url).href;
const imgRectangle2192 = new URL('./assets/10d67.svg', import.meta.url).href;
const imgRectangle2193 = new URL('./assets/fb8b8.svg', import.meta.url).href;
const imgRectangle2194 = new URL('./assets/36cb1.svg', import.meta.url).href;
const imgRectangle2198 = new URL('./assets/0056a.svg', import.meta.url).href;
const imgRectangle2202 = new URL('./assets/65972.svg', import.meta.url).href;
const imgRectangle2188 = new URL('./assets/c6aeb.svg', import.meta.url).href;
const imgRectangle2190 = new URL('./assets/385e9.svg', import.meta.url).href;
const imgRectangle2191 = new URL('./assets/effc4.svg', import.meta.url).href;
const imgImgImage = new URL('./assets/00a76.svg', import.meta.url).href;
const imgVector4 = new URL('./assets/112e7.svg', import.meta.url).href;
function WeaponTitle({
  className
}) {
  return <div className={className || "splatoon-scenes__weapon-title"} data-node-id="1604:1281">
      <p className="splatoon-scenes__layer-1" data-node-id="1425:1360">
        스플랫 슈터
      </p>
      <p className="splatoon-scenes__layer-2" data-node-id="1425:1361">
        Splattershot
      </p>
    </div>;
}
function SplatoonScenes({
  onPreview
}) {
  return <div className="splatoon-scenes__layer-3" data-node-id="2492:12432" data-name="와프">
      <section className="splatoon-scenes__hero" data-node-id="2492:12433" data-name="로고" id="splatoon-hero" aria-label="스플래툰 3">
        <div className="splatoon-scenes__layer-4" data-node-id="2492:12434" data-name="b03de537-fcb9-4fa2-9031-c0f3bfe36051 3">
          <img alt="" className="splatoon-scenes__layer-5" src={imgB03De537Fcb94Fa29031C0F3Bfe360513} loading="eager" fetchPriority="high" decoding="async" />
        </div>
        <div className="splatoon-scenes__layer-6" data-node-id="2492:12435" data-name="로고 이너">
          <div className="splatoon-scenes__layer-7" data-node-id="2492:12436">
            <img alt="" className="splatoon-scenes__layer-8" src={imgRectangle2196} loading="eager" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-9" data-node-id="2492:12437">
            <div className="splatoon-scenes__layer-10">
              <div className="splatoon-scenes__layer-11">
                <img alt="" className="splatoon-scenes__layer-12" src={imgRectangle2200} loading="eager" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-13" data-node-id="2492:12438">
            <div className="splatoon-scenes__layer-14">
              <div className="splatoon-scenes__layer-15">
                <img alt="" className="splatoon-scenes__layer-16" src={imgRectangle2201} loading="eager" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-17" data-node-id="2492:12439">
            <img alt="" className="splatoon-scenes__layer-18" src={imgRectangle2197} loading="eager" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-19" data-node-id="2492:12440">
            <div className="splatoon-scenes__layer-20">
              <div className="splatoon-scenes__layer-21">
                <img alt="" className="splatoon-scenes__layer-22" src={imgRectangle2199} loading="eager" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-23" data-node-id="2492:12441" data-name="image 1201">
            <img alt="" className="splatoon-scenes__layer-24" src={imgImage1201} loading="eager" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-25" data-node-id="2492:12442">
            <div className="splatoon-scenes__layer-26">
              <div className="splatoon-scenes__layer-27" data-name="f7f40ea3-64b2-469b-8fb6-e403278c2616 1">
                <img alt="" className="splatoon-scenes__layer-28" src={imgF7F40Ea364B2469B8Fb6E403278C26161} loading="eager" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-29" data-node-id="2492:12443">
            <div className="splatoon-scenes__layer-30">
              <div className="splatoon-scenes__layer-31" data-name="image 1208">
                <div className="splatoon-scenes__layer-32">
                  <img alt="" className="splatoon-scenes__layer-33" src={imgImage1208} loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-34" data-node-id="2492:12444">
            <div className="splatoon-scenes__layer-35">
              <p className="splatoon-scenes__layer-36">Color</p>
            </div>
          </div>
          <div className="splatoon-scenes__layer-37" data-node-id="2492:12445">
            <div className="splatoon-scenes__layer-38">
              <p className="splatoon-scenes__layer-39">strategy</p>
            </div>
          </div>
          <div className="splatoon-scenes__layer-40" data-node-id="2492:12446">
            <div className="splatoon-scenes__layer-41">
              <p className="splatoon-scenes__layer-42">Shoot</p>
            </div>
          </div>
          <div className="splatoon-scenes__layer-43" data-node-id="2492:12447">
            <div className="splatoon-scenes__layer-44">
              <p className="splatoon-scenes__layer-45">Squid</p>
            </div>
          </div>
          <div className="splatoon-scenes__layer-46" data-node-id="2492:12448" data-name="c0423173-e64a-4ca6-b318-0d5cdd3c1876 1">
            <div className="splatoon-scenes__layer-47">
              <img alt="" className="splatoon-scenes__layer-48" src={imgC0423173E64A4Ca6B3180D5Cdd3C18761} loading="eager" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-49" data-node-id="2492:12449">
            <div className="splatoon-scenes__layer-50">
              <div className="splatoon-scenes__layer-51" data-name="image 1080">
                <div className="splatoon-scenes__layer-52">
                  <img alt="" className="splatoon-scenes__layer-53" src={imgImage1080} loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-54" data-node-id="2492:12450">
            <div className="splatoon-scenes__layer-55">
              <div className="splatoon-scenes__layer-56" data-name="image 1216">
                <div className="splatoon-scenes__layer-57">
                  <img alt="" className="splatoon-scenes__layer-58" src={imgImage1080} loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-59" data-node-id="2492:12451">
            <div className="splatoon-scenes__layer-60">
              <div className="splatoon-scenes__layer-61" data-name="image 1217">
                <div className="splatoon-scenes__layer-62">
                  <img alt="" className="splatoon-scenes__layer-63" src={imgImage1080} loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-64" data-node-id="2492:12452">
            <div className="splatoon-scenes__layer-65">
              <div className="splatoon-scenes__layer-66" data-name="image 1218">
                <div className="splatoon-scenes__layer-67">
                  <img alt="" className="splatoon-scenes__layer-68" src={imgImage1080} loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-69" data-node-id="2492:12453">
            <div className="splatoon-scenes__layer-70">
              <div className="splatoon-scenes__layer-71" data-name="image 1219">
                <div className="splatoon-scenes__layer-72">
                  <img alt="" className="splatoon-scenes__layer-73" src={imgImage1080} loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-74" data-node-id="2492:12454" data-name="83a393bc-ef58-465b-93f7-0d326a66b649 1">
            <div className="splatoon-scenes__layer-75">
              <img alt="" className="splatoon-scenes__layer-76" src={img83A393BcEf58465B93F70D326A66B6491} loading="eager" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-77" data-node-id="2492:12455">
            <div className="splatoon-scenes__layer-78">
              <p className="splatoon-scenes__layer-79">Smash</p>
            </div>
          </div>
          <div className="splatoon-scenes__layer-80" data-node-id="2492:12456">
            <div className="splatoon-scenes__layer-81">
              <div className="splatoon-scenes__layer-82" data-name="image 1221">
                <div className="splatoon-scenes__layer-83">
                  <img alt="" className="splatoon-scenes__layer-84" src={imgImage1221} loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-85" data-node-id="2492:12457">
            <div className="splatoon-scenes__layer-86">
              <div className="splatoon-scenes__layer-87" data-name="logo 1">
                <img alt="스플래툰 3" className="splatoon-scenes__layer-88" src={imgLogo1} loading="eager" decoding="async" />
              </div>
            </div>
          </div>
        </div>

      </section>
      <section className="splatoon-scenes__play" data-node-id="2492:12459" data-name="플레이 영상" id="splatoon-play" aria-label="쏘고, 물들이고, 점령해라!">
        <div className="splatoon-scenes__layer-89" data-node-id="2492:12460" data-name="배경">
          <div className="splatoon-scenes__layer-90">
            <img alt="" className="splatoon-scenes__layer-91" src={img} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="splatoon-scenes__layer-92" data-node-id="2492:12461" data-name="플레이 영상 이너">
          <div className="splatoon-scenes__layer-93" data-node-id="2492:12464">
            <p className="splatoon-scenes__layer-94">쏘고, 물들이고, 점령해라!</p>
            <p className="splatoon-scenes__layer-95">나의 색깔로 세상을 물들이세요!</p>
          </div>
          <div className="splatoon-scenes__layer-96" data-node-id="2492:12476">
            <div className="splatoon-scenes__layer-97">
              <div className="splatoon-scenes__layer-98" data-name="image 1157">
                <img alt="" className="splatoon-scenes__layer-99" src={imgImage1157} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>


          <div className="splatoon-scenes__layer-102" data-node-id="2602:21009" data-name="곰이다">
            <div className="splatoon-scenes__layer-103" data-node-id="2492:12467" />
            <div className="splatoon-scenes__layer-104" data-node-id="2492:12468" data-name="Mask group">
              <div className="splatoon-scenes__layer-105" data-node-id="2492:12470" style={{
              maskImage: `url("${imgRectangle2189}")`
            }} />
            </div>
            <div className="splatoon-scenes__layer-106" data-node-id="2492:12471">
              <img alt="" className="splatoon-scenes__layer-107" src={imgEllipse1} loading="lazy" decoding="async" />
            </div>
            <div className="splatoon-scenes__layer-108" data-node-id="2492:12472">
              <img alt="" className="splatoon-scenes__layer-109" src={imgEllipse1} loading="lazy" decoding="async" />
            </div>
            <div className="splatoon-scenes__layer-110" data-node-id="2492:12473" data-name="565821cf-3a82-4337-aad9-bdc96719c5a4 1">
              <img alt="" className="splatoon-scenes__layer-111" src={img565821Cf3A824337Aad9Bdc96719C5A41} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-112" data-node-id="2602:21016" data-name="승리영상">
            <img className="splatoon-scenes__layer-113" data-node-id="2563:19476" data-name="승리후 영상 1" src={new URL('./assets/play-victory.png', import.meta.url).href} alt="스플래툰 3 플레이 화면" loading="lazy" />
            <div className="splatoon-scenes__layer-114" data-node-id="2602:21012" data-name="download 2">
              <div className="splatoon-scenes__layer-115">
                <img alt="" className="splatoon-scenes__layer-116" src={imgDownload2} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-117" data-node-id="2602:21018" data-name="초록 분홍 영상">
            <img className="splatoon-scenes__layer-118" data-node-id="2492:12481" data-name="스플래툰 짧은 영상2 1" src={new URL('./assets/play-pink.png', import.meta.url).href} alt="스플래툰 3 플레이 화면" loading="lazy" />
            <div className="splatoon-scenes__layer-119" data-node-id="2602:21010" data-name="download 1">
              <div className="splatoon-scenes__layer-120">
                <img alt="" className="splatoon-scenes__layer-121" src={imgDownload1} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-122" data-node-id="2602:21017" data-name="노랑 분홍 영상">
            <img className="splatoon-scenes__layer-123" data-node-id="2492:12482" data-name="스플래툰 짧은 버전 1" src={new URL('./assets/play-yellow.png', import.meta.url).href} alt="스플래툰 3 플레이 화면" loading="lazy" />
            <div className="splatoon-scenes__layer-124" data-node-id="2602:21014" data-name="download 3">
              <div className="splatoon-scenes__layer-125">
                <img alt="" className="splatoon-scenes__layer-126" src={imgDownload3} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="splatoon-scenes__weapons" data-node-id="2492:12483" data-name="슈터" id="splatoon-weapons" aria-label="나만의 무기를 골라보자">
        <div className="splatoon-scenes__layer-127" data-node-id="2492:12484" data-name="배경">
          <div className="splatoon-scenes__layer-128">
            <img alt="" className="splatoon-scenes__layer-129" src={img} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="splatoon-scenes__layer-130" data-node-id="2492:12485" data-name="슈터 이너">
          <div className="splatoon-scenes__layer-131" data-node-id="2492:12486">
            <div className="splatoon-scenes__layer-132" data-node-id="2492:12487">
              <div className="splatoon-scenes__layer-133">
                <img alt="" className="splatoon-scenes__layer-134" src={imgRectangle2180} loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="splatoon-scenes__layer-135" data-node-id="2492:12488">
              <div className="splatoon-scenes__layer-136">
                <div className="splatoon-scenes__layer-137" data-name="467bef59-24b8-4459-a529-c229efa71185 1">
                  <div className="splatoon-scenes__layer-138">
                    <img alt="" className="splatoon-scenes__layer-139" src={img467Bef5924B84459A529C229Efa711851} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
            <div className="splatoon-scenes__layer-140" data-node-id="2492:12489">
              <div className="splatoon-scenes__layer-141">
                <div className="splatoon-scenes__layer-142">
                  <div className="splatoon-scenes__layer-143">
                    <img alt="" className="splatoon-scenes__layer-144" src={imgRectangle2175} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
            <div className="splatoon-scenes__layer-145" data-node-id="2492:12490">
              <div className="splatoon-scenes__layer-146">
                <div className="splatoon-scenes__layer-147">
                  <div className="splatoon-scenes__layer-148">
                    <img alt="" className="splatoon-scenes__layer-149" src={imgRectangle2176} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
            <div className="splatoon-scenes__layer-150" data-node-id="2492:12491">
              <div className="splatoon-scenes__layer-151">
                <div className="splatoon-scenes__layer-152">
                  <div className="splatoon-scenes__layer-153">
                    <img alt="" className="splatoon-scenes__layer-154" src={imgRectangle2177} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
            <div className="splatoon-scenes__layer-155" data-node-id="2492:12492">
              <div className="splatoon-scenes__layer-156">
                <div className="splatoon-scenes__layer-157">
                  <div className="splatoon-scenes__layer-158">
                    <img alt="" className="splatoon-scenes__layer-159" src={imgRectangle2178} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
            <div className="splatoon-scenes__layer-160" data-node-id="2492:12493">
              <img alt="" className="splatoon-scenes__layer-161" src={imgRectangle2179} loading="lazy" decoding="async" />
            </div>
            <div className="splatoon-scenes__layer-162" data-node-id="2492:12494">
              <div className="splatoon-scenes__layer-163">
                <div className="splatoon-scenes__layer-164">
                  <img alt="" className="splatoon-scenes__layer-165" src={imgRectangle2181} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
            <div className="splatoon-scenes__layer-166" data-node-id="2492:12495">
              <div className="splatoon-scenes__layer-167">
                <div className="splatoon-scenes__layer-168" data-name="image 1096">
                  <img alt="" className="splatoon-scenes__layer-169" src={imgImage1096} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
            <div className="splatoon-scenes__layer-170" data-node-id="2492:12496">
              <div className="splatoon-scenes__layer-171">
                <p className="splatoon-scenes__layer-172">Damge</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-173" data-node-id="2492:12497">
              <div className="splatoon-scenes__layer-174">
                <p className="splatoon-scenes__layer-175">Range</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-176" data-node-id="2492:12498">
              <div className="splatoon-scenes__layer-177">
                <p className="splatoon-scenes__layer-178">True damage</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-179" data-node-id="2492:12499">
              <div className="splatoon-scenes__layer-180">
                <p className="splatoon-scenes__layer-181">Charge</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-182" data-node-id="2492:12500">
              <div className="splatoon-scenes__layer-183">
                <p className="splatoon-scenes__layer-184">Difficulty</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-185" data-node-id="2492:12501">
              <div className="splatoon-scenes__layer-186">
                <p className="splatoon-scenes__layer-187">Role</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-188" data-node-id="2492:12502" data-name="7f0e83df-7138-442c-a5f5-bdcb3e781846 2">
              <div className="splatoon-scenes__layer-189">
                <img alt="" className="splatoon-scenes__layer-190" src={img7F0E83Df7138442CA5F5Bdcb3E7818462} loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="splatoon-scenes__layer-191" data-node-id="2492:12503">
              <div className="splatoon-scenes__layer-192">
                <p className="splatoon-scenes__layer-193">ALL-rounder</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-194" data-node-id="2492:12504">
              <div className="splatoon-scenes__layer-195">
                <p className="splatoon-scenes__layer-196">LOW</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-197" data-node-id="2492:12505">
              <div className="splatoon-scenes__layer-198">
                <p className="splatoon-scenes__layer-199">36</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-200" data-node-id="2492:12506">
              <div className="splatoon-scenes__layer-201">
                <p className="splatoon-scenes__layer-202">3</p>
              </div>
            </div>
            <div className="splatoon-scenes__layer-203" data-node-id="2492:12507">
              <div className="splatoon-scenes__layer-204">
                <p className="splatoon-scenes__layer-205">11.56</p>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-206" data-node-id="2492:12508" />
          <div className="splatoon-scenes__layer-207" data-node-id="2492:12509">
            <p className="splatoon-scenes__layer-208">{`색칠하는 방식을 선택해 `}</p>
            <p className="splatoon-scenes__layer-209">나만의 무기를 골라보자!</p>
          </div>
          <WeaponTitle className="splatoon-scenes__layer-210" />
          <div className="splatoon-scenes__layer-211" data-node-id="2492:12511">
            <div className="splatoon-scenes__layer-212">
              <img alt="" className="splatoon-scenes__layer-213" src={imgRectangle2182} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-214" data-node-id="2492:12512">
            <div className="splatoon-scenes__layer-215">
              <div className="splatoon-scenes__layer-216" data-name="image 1078">
                <img alt="" className="splatoon-scenes__layer-217" src={imgImage1078} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <button className="splatoon-scenes__layer-218 splatoon-content__weapon-button" data-node-id="2492:12513" type="button" aria-label={weapons[0].name + ' 이미지 보기'} onClick={() => onPreview(weapons[0])}>
            <div className="splatoon-scenes__layer-219">
              <div className="splatoon-scenes__layer-220">
                <div className="splatoon-scenes__layer-221" data-node-id="2492:12514" data-name="image 1080">
                  <div className="splatoon-scenes__layer-222">
                    <img alt="" className="splatoon-scenes__layer-223" src={imgImage1080} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="splatoon-scenes__layer-224" data-node-id="2492:12515" data-name="image 1190">
                  <div className="splatoon-scenes__layer-225">
                    <img alt="" className="splatoon-scenes__layer-226" src={imgImage1190} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button className="splatoon-scenes__layer-227 splatoon-content__weapon-button" data-node-id="2492:12516" type="button" aria-label={weapons[1].name + ' 이미지 보기'} onClick={() => onPreview(weapons[1])}>
            <div className="splatoon-scenes__layer-228">
              <div className="splatoon-scenes__layer-229">
                <div className="splatoon-scenes__layer-230" data-node-id="2492:12517" data-name="image 1080">
                  <div className="splatoon-scenes__layer-231">
                    <img alt="" className="splatoon-scenes__layer-232" src={imgImage1080} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="splatoon-scenes__layer-233" data-node-id="2492:12518">
                  <div className="splatoon-scenes__layer-234">
                    <div className="splatoon-scenes__layer-235" data-name="6b601f96-e1e6-466e-b2d1-0c6335c1d02a 2">
                      <img alt="" className="splatoon-scenes__layer-236" src={img6B601F96E1E6466EB2D10C6335C1D02A2} loading="lazy" decoding="async" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button className="splatoon-scenes__layer-237 splatoon-content__weapon-button" data-node-id="2492:12519" type="button" aria-label={weapons[2].name + ' 이미지 보기'} onClick={() => onPreview(weapons[2])}>
            <div className="splatoon-scenes__layer-238">
              <div className="splatoon-scenes__layer-239">
                <div className="splatoon-scenes__layer-240" data-node-id="2492:12520" data-name="image 1080">
                  <div className="splatoon-scenes__layer-241">
                    <img alt="" className="splatoon-scenes__layer-242" src={imgImage1080} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="splatoon-scenes__layer-243" data-node-id="2492:12521">
                  <div className="splatoon-scenes__layer-244">
                    <div className="splatoon-scenes__layer-245" data-name="image 1190">
                      <div className="splatoon-scenes__layer-246">
                        <img alt="" className="splatoon-scenes__layer-247" src={imgImage1191} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button className="splatoon-scenes__layer-248 splatoon-content__weapon-button" data-node-id="2492:12522" type="button" aria-label={weapons[3].name + ' 이미지 보기'} onClick={() => onPreview(weapons[3])}>
            <div className="splatoon-scenes__layer-249">
              <div className="splatoon-scenes__layer-250">
                <div className="splatoon-scenes__layer-251" data-node-id="2492:12523" data-name="image 1080">
                  <div className="splatoon-scenes__layer-252">
                    <img alt="" className="splatoon-scenes__layer-253" src={imgImage1080} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="splatoon-scenes__layer-254" data-node-id="2492:12524">
                  <div className="splatoon-scenes__layer-255">
                    <div className="splatoon-scenes__layer-256" data-name="0102a229-df6d-43a6-b1da-448b8340f9da 2">
                      <div className="splatoon-scenes__layer-257">
                        <img alt="" className="splatoon-scenes__layer-258" src={img0102A229Df6D43A6B1Da448B8340F9Da2} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button className="splatoon-scenes__layer-259 splatoon-content__weapon-button" data-node-id="2492:12525" type="button" aria-label={weapons[4].name + ' 이미지 보기'} onClick={() => onPreview(weapons[4])}>
            <div className="splatoon-scenes__layer-260">
              <div className="splatoon-scenes__layer-261">
                <div className="splatoon-scenes__layer-262" data-node-id="2492:12526" data-name="image 1080">
                  <div className="splatoon-scenes__layer-263">
                    <img alt="" className="splatoon-scenes__layer-264" src={imgImage1080} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="splatoon-scenes__layer-265" data-node-id="2492:12527" data-name="image 1190">
                  <div className="splatoon-scenes__layer-266">
                    <img alt="" className="splatoon-scenes__layer-267" src={imgImage1192} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button className="splatoon-scenes__layer-268 splatoon-content__weapon-button" data-node-id="2492:12528" type="button" aria-label={weapons[5].name + ' 이미지 보기'} onClick={() => onPreview(weapons[5])}>
            <div className="splatoon-scenes__layer-269">
              <div className="splatoon-scenes__layer-270">
                <div className="splatoon-scenes__layer-271" data-node-id="2492:12529" data-name="image 1080">
                  <div className="splatoon-scenes__layer-272">
                    <img alt="" className="splatoon-scenes__layer-273" src={imgImage1080} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="splatoon-scenes__layer-274" data-node-id="2492:12530">
                  <div className="splatoon-scenes__layer-275">
                    <div className="splatoon-scenes__layer-276" data-name="950dc38d-204e-4af0-83c0-d6aae042a2d2 2">
                      <div className="splatoon-scenes__layer-277">
                        <img alt="" className="splatoon-scenes__layer-278" src={img950Dc38D204E4Af083C0D6Aae042A2D22} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button className="splatoon-scenes__layer-279 splatoon-content__weapon-button" data-node-id="2492:12531" type="button" aria-label={weapons[6].name + ' 이미지 보기'} onClick={() => onPreview(weapons[6])}>
            <div className="splatoon-scenes__layer-280">
              <div className="splatoon-scenes__layer-281">
                <div className="splatoon-scenes__layer-282" data-node-id="2492:12532">
                  <div className="splatoon-scenes__layer-283">
                    <div className="splatoon-scenes__layer-284" data-name="image 1185">
                      <div className="splatoon-scenes__layer-285">
                        <img alt="" className="splatoon-scenes__layer-286" src={imgImage1185} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="splatoon-scenes__layer-287" data-node-id="2492:12533" data-name="image 1080">
                  <div className="splatoon-scenes__layer-288">
                    <img alt="" className="splatoon-scenes__layer-289" src={imgImage1080} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
          </button>
          <div className="splatoon-scenes__layer-290 splatoon-content__decoration" data-node-id="2492:12534" data-name="무기 선택" aria-hidden="true" />
        </div>
      </section>
      <section className="splatoon-scenes__fashion" data-node-id="2492:12535" data-name="섹션1" id="splatoon-fashion" aria-label="오징어가 패션을!?">
        <div className="splatoon-scenes__layer-291" data-node-id="2492:12536" data-name="beeeed74-b0d8-4005-a448-b337ec4dedf9 2">
          <img alt="" className="splatoon-scenes__layer-292" src={imgBeeeed74B0D84005A448B337Ec4Dedf92} loading="lazy" decoding="async" />
        </div>
        <div className="splatoon-scenes__layer-293" data-node-id="2492:12537" data-name="63d69680-30d0-48ae-951e-852fa14d9e49 1">
          <div className="splatoon-scenes__layer-294">
            <img alt="" className="splatoon-scenes__layer-295" src={img63D6968030D048Ae951E852Fa14D9E491} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="splatoon-scenes__layer-296" data-node-id="2492:12538">
          <div className="splatoon-scenes__layer-297">
            <p className="splatoon-scenes__layer-298">패션을!?</p>
          </div>
        </div>
        <div className="splatoon-scenes__layer-299" data-node-id="2492:12539">
          <div className="splatoon-scenes__layer-300">
            <div className="splatoon-scenes__layer-301">
              <div className="splatoon-scenes__layer-302">
                <img alt="" className="splatoon-scenes__layer-303" src={imgRectangle2195} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
        <div className="splatoon-scenes__layer-304" data-node-id="2492:12540">
          <div className="splatoon-scenes__layer-305">
            <p className="splatoon-scenes__layer-306">오징어가</p>
          </div>
        </div>
        <div className="splatoon-scenes__layer-307" data-node-id="2492:12541">
          <div className="splatoon-scenes__layer-308">
            <p className="splatoon-scenes__layer-309">PASHION</p>
          </div>
        </div>
      </section>
      <section className="splatoon-scenes__hair" data-node-id="2492:12542" data-name="스타일링-헤어" id="splatoon-hair" aria-label="NEW hair">
        <div className="splatoon-scenes__layer-310" data-node-id="2492:12543" data-name="배경">
          <img alt="" className="splatoon-scenes__layer-311" src={imgB03De537Fcb94Fa29031C0F3Bfe360513} loading="lazy" decoding="async" />
        </div>
        <div className="splatoon-scenes__layer-312" data-node-id="2492:12544" data-name="헤어 이너">
          <div className="splatoon-scenes__layer-313" data-node-id="2492:12545">
            <img alt="" className="splatoon-scenes__layer-314" src={imgRectangle2192} loading="lazy" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-315" data-node-id="2492:12546">
            <img alt="" className="splatoon-scenes__layer-316" src={imgRectangle2193} loading="lazy" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-317" data-node-id="2492:12547">
            <img alt="" className="splatoon-scenes__layer-318" src={imgRectangle2194} loading="lazy" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-319" data-node-id="2492:12548">
            <div className="splatoon-scenes__layer-320">
              <div className="splatoon-scenes__layer-321" data-name="image 1162">
                <div className="splatoon-scenes__layer-322">
                  <img alt="" className="splatoon-scenes__layer-323" src={imgImage1162} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-324" data-node-id="2492:12549" data-name="image 1077">
            <div className="splatoon-scenes__layer-325">
              <img alt="" className="splatoon-scenes__layer-326" src={imgImage1077} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-327" data-node-id="2492:12550">
            <div className="splatoon-scenes__layer-328">
              <div className="splatoon-scenes__layer-329" data-name="image 1165">
                <div className="splatoon-scenes__layer-330">
                  <img alt="" className="splatoon-scenes__layer-331" src={imgImage1165} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-332" data-node-id="2492:12551">
            <div className="splatoon-scenes__layer-333">
              <div className="splatoon-scenes__layer-334" data-name="df46cb32-0796-4ae0-94ce-9cf00a6e4f68 1">
                <div className="splatoon-scenes__layer-335">
                  <img alt="" className="splatoon-scenes__layer-336" src={imgDf46Cb3207964Ae094Ce9Cf00A6E4F681} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-337" data-node-id="2492:12552">
            <div className="splatoon-scenes__layer-338">
              <div className="splatoon-scenes__layer-339" data-name="image 1160">
                <div className="splatoon-scenes__layer-340">
                  <img alt="" className="splatoon-scenes__layer-341" src={imgImage1160} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-342" data-node-id="2492:12553">
            <div className="splatoon-scenes__layer-343">
              <div className="splatoon-scenes__layer-344" data-name="image 1166">
                <img alt="" className="splatoon-scenes__layer-345" src={imgImage1166} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-346" data-node-id="2492:12554">
            <div className="splatoon-scenes__layer-347">
              <div className="splatoon-scenes__layer-348" data-name="image 1080">
                <div className="splatoon-scenes__layer-349">
                  <img alt="" className="splatoon-scenes__layer-350" src={imgImage1080} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-351" data-node-id="2492:12555">
            <div className="splatoon-scenes__layer-352">
              <div className="splatoon-scenes__layer-353" data-name="89255e44-821b-4a53-923e-fffe2976fbbf 1">
                <div className="splatoon-scenes__layer-354">
                  <img alt="" className="splatoon-scenes__layer-355" src={img89255E44821B4A53923EFffe2976Fbbf1} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <p className="splatoon-scenes__layer-356" data-node-id="2492:12556">
            NEW hair
          </p>
          <div className="splatoon-scenes__layer-357" data-node-id="2492:12557">
            <img alt="" className="splatoon-scenes__layer-358" src={imgRectangle2198} loading="lazy" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-359" data-node-id="2492:12558">
            <div className="splatoon-scenes__layer-360">
              <div className="splatoon-scenes__layer-361">
                <img alt="" className="splatoon-scenes__layer-362" src={imgRectangle2202} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-363" data-node-id="2492:12559" data-name="구린 오징어">
            <div className="splatoon-scenes__layer-364">
              <img alt="" className="splatoon-scenes__layer-365" src={img1} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-366" data-node-id="2492:12560">
            <div className="splatoon-scenes__layer-367">
              <div className="splatoon-scenes__layer-368" data-name="ef3ed2ea-2bb7-40d6-acef-0fae5cd1b9f0 1">
                <img alt="" className="splatoon-scenes__layer-369" src={imgEf3Ed2Ea2Bb740D6Acef0Fae5Cd1B9F01} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <button className="splatoon-scenes__layer-370" data-node-id="2492:12561" type="button" aria-label="헤어 스타일 이미지 보기" onClick={() => onPreview({
          name: '스플래툰 헤어 스타일',
          image: new URL('./assets/dea2f.png', import.meta.url).href
        })}>
            <div className="splatoon-scenes__layer-371">
              <p className="splatoon-scenes__layer-372">Previous</p>
            </div>
          </button>
          <button className="splatoon-scenes__layer-373" data-node-id="2492:12562" type="button" aria-label="헤어 스타일 이미지 보기" onClick={() => onPreview({
          name: '스플래툰 헤어 스타일',
          image: new URL('./assets/dea2f.png', import.meta.url).href
        })}>
            <div className="splatoon-scenes__layer-374">
              <p className="splatoon-scenes__layer-375">NEXT</p>
            </div>
          </button>
        </div>
      </section>
      <section className="splatoon-scenes__town" data-node-id="2492:12563" data-name="신맵 설명" id="splatoon-town" aria-label="카오폴리스 타운">
        <div className="splatoon-scenes__layer-376" data-node-id="2492:12564" data-name="배경">
          <div className="splatoon-scenes__layer-377">
            <img alt="" className="splatoon-scenes__layer-378" src={img} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="splatoon-scenes__layer-379" data-node-id="2492:12565" data-name="신맵 설명 이너">
          <div className="splatoon-scenes__layer-380" data-node-id="2492:12566" data-name="24ba7433-87ff-4b43-9c67-04a48eca40db 1">
            <div className="splatoon-scenes__layer-381">
              <img alt="" className="splatoon-scenes__layer-382" src={img24Ba743387Ff4B439C6704A48Eca40Db1} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-383" data-node-id="2492:12567" data-name="5fa0d08d-c296-49e5-aceb-4d4c218961df 1">
            <div className="splatoon-scenes__layer-384">
              <img alt="" className="splatoon-scenes__layer-385" src={img5Fa0D08DC29649E5Aceb4D4C218961Df1} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-386" data-node-id="2492:12568">
            <div className="splatoon-scenes__layer-387">
              <div className="splatoon-scenes__layer-388" data-name="5fa0d08d-c296-49e5-aceb-4d4c218961df 2">
                <div className="splatoon-scenes__layer-389">
                  <img alt="" className="splatoon-scenes__layer-390" src={img5Fa0D08DC29649E5Aceb4D4C218961Df1} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-391" data-node-id="2492:12569" data-name="54686680-6d08-444f-a76c-96ea2c9fd1e7 1">
            <div className="splatoon-scenes__layer-392">
              <img alt="" className="splatoon-scenes__layer-393" src={img546866806D08444FA76C96Ea2C9Fd1E71} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-394" data-node-id="2492:12570">
            <div className="splatoon-scenes__layer-395">
              <p className="splatoon-scenes__layer-396">카로폴리스 타운은</p>
            </div>
          </div>
          <p className="splatoon-scenes__layer-397" data-node-id="2492:12571">{`다양한 해양 생물과 건물이 들어선 `}</p>
          <div className="splatoon-scenes__layer-398" data-node-id="2492:12572">
            <div className="splatoon-scenes__layer-399">
              <p className="splatoon-scenes__layer-400">{` 독특한 분위기의 지상 도시입니다.`}</p>
            </div>
          </div>
          <div className="splatoon-scenes__layer-401" data-node-id="2492:12573">
            <div className="splatoon-scenes__layer-402">
              <div className="splatoon-scenes__layer-403" data-name="카오폴리스역">
                <div className="splatoon-scenes__layer-404" data-node-id="2492:12574" data-name="773668ce-62f1-4e90-a64d-c5f1ad4ff2eb 1">
                  <div className="splatoon-scenes__layer-405">
                    <img alt="" className="splatoon-scenes__layer-406" src={img773668Ce62F14E90A64DC5F1Ad4Ff2Eb1} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="splatoon-scenes__layer-407" data-node-id="2492:12575">
                  <div className="splatoon-scenes__layer-408">
                    <p className="splatoon-scenes__layer-409">발 밑 조심</p>
                  </div>
                </div>
                <div className="splatoon-scenes__layer-410" data-node-id="2492:12576">
                  <div className="splatoon-scenes__layer-411">
                    <p className="splatoon-scenes__layer-412">SPLATOON3</p>
                  </div>
                </div>
                <div className="splatoon-scenes__layer-413" data-node-id="2492:12577">
                  <div className="splatoon-scenes__layer-414">
                    <p className="splatoon-scenes__layer-415">
                      <span className="splatoon-scenes__layer-416">이번역은</span>
                      <span className="splatoon-scenes__layer-417">{` 카오폴리스 타운`}</span>
                      <span className="splatoon-scenes__layer-418">입니다</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="splatoon-scenes__information" data-node-id="2492:12578" data-name="더 많은 정보" id="splatoon-information" aria-label="INFORMATIONS">
        <div className="splatoon-scenes__layer-419" data-node-id="2492:12579" data-name="배경">
          <img alt="" className="splatoon-scenes__layer-420" src={img2} loading="lazy" decoding="async" />
        </div>
        <div className="splatoon-scenes__layer-421" data-node-id="2492:12580" data-name="더 많은 정보 이너">
          <div className="splatoon-scenes__layer-422" data-node-id="2492:12581">
            <div className="splatoon-scenes__layer-423">
              <img alt="" className="splatoon-scenes__layer-424" src={imgRectangle2188} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-425" data-node-id="2492:12582">
            <div className="splatoon-scenes__layer-426">
              <img alt="" className="splatoon-scenes__layer-427" src={imgRectangle2190} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-428" data-node-id="2492:12583">
            <div className="splatoon-scenes__layer-429">
              <img alt="" className="splatoon-scenes__layer-430" src={imgRectangle2191} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-431" data-node-id="2492:12584">
            <div className="splatoon-scenes__layer-432">
              <div className="splatoon-scenes__layer-433" data-name="63e1d427-8b51-4310-9aad-3e7e51909c3f 1">
                <img alt="" className="splatoon-scenes__layer-434" src={img63E1D4278B5143109Aad3E7E51909C3F1} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-435" data-node-id="2492:12585">
            <div className="splatoon-scenes__layer-436">
              <div className="splatoon-scenes__layer-437" data-name="image 1079">
                <div className="splatoon-scenes__layer-438">
                  <img alt="" className="splatoon-scenes__layer-439" src={imgImage1079} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-440" data-node-id="2492:12586">
            <div className="splatoon-scenes__layer-441">
              <div className="splatoon-scenes__layer-442" data-name="image 1088">
                <div className="splatoon-scenes__layer-443">
                  <img alt="" className="splatoon-scenes__layer-444" src={imgImage1079} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-445" data-node-id="2492:12587">
            <div className="splatoon-scenes__layer-446">
              <div className="splatoon-scenes__layer-447" data-name="image 1089">
                <div className="splatoon-scenes__layer-448">
                  <img alt="" className="splatoon-scenes__layer-449" src={imgImage1079} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-450" data-node-id="2492:12588">
            <div className="splatoon-scenes__layer-451">
              <div className="splatoon-scenes__layer-452" data-name="e029a8a7-697c-4f9d-8782-41145c5f2ea1 2">
                <img alt="" className="splatoon-scenes__layer-453" src={imgE029A8A7697C4F9D878241145C5F2Ea12} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-454" data-node-id="2492:12589">
            <div className="splatoon-scenes__layer-455">
              <div className="splatoon-scenes__layer-456" data-name="image 1084">
                <div className="splatoon-scenes__layer-457">
                  <img alt="" className="splatoon-scenes__layer-458" src={imgImage1079} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-459" data-node-id="2492:12590">
            <div className="splatoon-scenes__layer-460">
              <div className="splatoon-scenes__layer-461" data-name="image 1090">
                <div className="splatoon-scenes__layer-462">
                  <img alt="" className="splatoon-scenes__layer-463" src={imgImage1079} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-464" data-node-id="2492:12591">
            <div className="splatoon-scenes__layer-465">
              <div className="splatoon-scenes__layer-466" data-name="image 1086">
                <div className="splatoon-scenes__layer-467">
                  <img alt="" className="splatoon-scenes__layer-468" src={imgImage1079} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-469" data-node-id="2492:12592">
            <div className="splatoon-scenes__layer-470">
              <p className="splatoon-scenes__layer-471">INFORMATIONS</p>
            </div>
          </div>
          <div className="splatoon-scenes__layer-472" data-node-id="2492:12593" data-name="image 1087">
            <img alt="" className="splatoon-scenes__layer-473" src={imgImage1087} loading="lazy" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-474" data-node-id="2492:12594">
            <div className="splatoon-scenes__layer-475">
              <div className="splatoon-scenes__layer-476" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-477" data-node-id="2492:12595">
            <div className="splatoon-scenes__layer-478">
              <div className="splatoon-scenes__layer-479" />
            </div>
          </div>
          <div className="splatoon-scenes__layer-480" data-node-id="2492:12596" />
          <div className="splatoon-scenes__layer-481" data-node-id="2492:12597">
            <div className="splatoon-scenes__layer-482">
              <div className="splatoon-scenes__layer-483" />
            </div>
          </div>
          <AppLink className="splatoon-scenes__layer-484" data-node-id="2492:12598" to={navigationRoutes.community} aria-label="페스티벌 관련 정보 보기">
            <div className="splatoon-scenes__layer-485">
              <div className="splatoon-scenes__layer-486" data-name="btn_fes 1">
                <img alt="" className="splatoon-scenes__layer-487" src={imgBtnFes1} loading="lazy" decoding="async" />
              </div>
            </div>
          </AppLink>
          <AppLink className="splatoon-scenes__layer-488" data-node-id="2492:12599" to={navigationRoutes.games} aria-label="새먼 런 관련 정보 보기">
            <div className="splatoon-scenes__layer-489">
              <div className="splatoon-scenes__layer-490" data-name="btn_salmon 1">
                <img alt="" className="splatoon-scenes__layer-491" src={imgBtnSalmon1} loading="lazy" decoding="async" />
              </div>
            </div>
          </AppLink>
          <AppLink className="splatoon-scenes__layer-492" data-node-id="2492:12600" to={navigationRoutes.games} aria-label="히어로 모드 관련 정보 보기">
            <div className="splatoon-scenes__layer-493">
              <div className="splatoon-scenes__layer-494" data-name="btn_hero 1">
                <div className="splatoon-scenes__layer-495">
                  <img alt="" className="splatoon-scenes__layer-496" src={imgBtnHero1} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </AppLink>
          <AppLink className="splatoon-scenes__layer-497" data-node-id="2492:12601" to={navigationRoutes.games} aria-label="배틀 관련 정보 보기">
            <div className="splatoon-scenes__layer-498">
              <div className="splatoon-scenes__layer-499" data-name="btn_battle 1">
                <img alt="" className="splatoon-scenes__layer-500" src={imgBtnBattle1} loading="lazy" decoding="async" />
              </div>
            </div>
          </AppLink>
          <AppLink className="splatoon-scenes__layer-501" data-node-id="2492:12602" to={navigationRoutes.store} aria-label="amiibo 관련 정보 보기">
            <div className="splatoon-scenes__layer-502">
              <div className="splatoon-scenes__layer-503" data-name="btn_amiibo 1">
                <img alt="" className="splatoon-scenes__layer-504" src={imgBtnAmiibo1} loading="lazy" decoding="async" />
              </div>
            </div>
          </AppLink>
          <AppLink className="splatoon-scenes__layer-505" data-node-id="2492:12603" to={navigationRoutes.support} aria-label="앱 관련 정보 보기">
            <div className="splatoon-scenes__layer-506">
              <div className="splatoon-scenes__layer-507" data-name="btn_app 1">
                <img alt="" className="splatoon-scenes__layer-508" src={imgBtnApp1} loading="lazy" decoding="async" />
              </div>
            </div>
          </AppLink>
          <AppLink className="splatoon-scenes__layer-509" data-node-id="2492:12604" to={navigationRoutes.games} aria-label="오징어 연구소 관련 정보 보기">
            <div className="splatoon-scenes__layer-510">
              <div className="splatoon-scenes__layer-511" data-name="btn_ika 1">
                <img alt="" className="splatoon-scenes__layer-512" src={imgBtnIka1} loading="lazy" decoding="async" />
              </div>
            </div>
          </AppLink>
          <div className="splatoon-scenes__layer-513" data-node-id="2492:12605">
            <div className="splatoon-scenes__layer-514">
              <div className="splatoon-scenes__layer-515" data-name="image 1083">
                <img alt="" className="splatoon-scenes__layer-516" src={imgImage1083} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="splatoon-scenes__spacer" data-node-id="2492:12606" data-name="공간 섹션" id="splatoon-spacer">
        <div className="splatoon-scenes__layer-517" data-node-id="2492:12607" data-name="da1de45b-dfe6-4ae5-866f-7dbf34546243 3">
          <div className="splatoon-scenes__layer-518">
            <img alt="" className="splatoon-scenes__layer-519" src={imgDa1De45BDfe64Ae5866F7Dbf345462433} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
      <section className="splatoon-scenes__switch" data-node-id="2492:12608" data-name="스위치2 연계" id="splatoon-switch" aria-label="Nintendo Switch 2에서 더욱 선명하게">
        <div className="splatoon-scenes__layer-520" data-node-id="2492:12609" data-name="배경">
          <img alt="" className="splatoon-scenes__layer-521" src={imgB03De537Fcb94Fa29031C0F3Bfe360513} loading="lazy" decoding="async" />
        </div>
        <div className="splatoon-scenes__layer-522" data-node-id="2492:12610" data-name="스위치2 연계 이너">
          <div className="splatoon-scenes__layer-523" data-node-id="2492:12611" data-name="img/image">
            <img alt="" className="splatoon-scenes__layer-524" src={imgImgImage} loading="lazy" decoding="async" />
          </div>
          <div className="splatoon-scenes__layer-525" data-node-id="2492:12612">
            <div className="splatoon-scenes__layer-526" data-node-id="2492:12613">
              <p className="splatoon-scenes__layer-527">Nintendo Switch 2에서</p>
              <p className="splatoon-scenes__layer-528">더욱 선명하게</p>
            </div>
            <p className="splatoon-scenes__layer-529" data-node-id="2492:12614">
              Nintendo Switch 2에서 본 작품을 플레이하면
            </p>
            <p className="splatoon-scenes__layer-530" data-node-id="2492:12615">
              더욱 선명한 화면으로 즐기실 수 있습니다.
            </p>
            <p className="splatoon-scenes__layer-531" data-node-id="2492:12616">
              TV모드에서는 4K 화질로 플레이할 수 있습니다.
            </p>
            <div className="splatoon-scenes__layer-532" data-node-id="2492:12617">
              <p className="splatoon-scenes__layer-533"># 무료 업데이트가 필요합니다.</p>
              <p className="splatoon-scenes__layer-534">#사용하시는 TV가 대응해야 합니다.</p>
            </div>
            <AppLink className="splatoon-scenes__layer-535" data-node-id="2660:3884" to={navigationRoutes.hardware} aria-label="Nintendo Switch 2 자세히 보기">
              자세한 내용은 이쪽에서
            </AppLink>
            <div className="splatoon-scenes__layer-536" data-node-id="2660:3885" />
            <div className="splatoon-scenes__layer-537" data-node-id="2660:3886">
              <div className="splatoon-scenes__layer-538">
                <img alt="" className="splatoon-scenes__layer-539" src={imgVector4} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-540" data-node-id="2492:12619">
            <div className="splatoon-scenes__layer-541">
              <div className="splatoon-scenes__layer-542" data-name="801ee8a5-9a31-4465-babf-56bafd6036a0 1">
                <div className="splatoon-scenes__layer-543">
                  <img alt="" className="splatoon-scenes__layer-544" src={img801Ee8A59A314465Babf56Bafd6036A01} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-545" data-node-id="2492:12620">
            <div className="splatoon-scenes__layer-546">
              <div className="splatoon-scenes__layer-547" data-name="801ee8a5-9a31-4465-babf-56bafd6036a0 2">
                <div className="splatoon-scenes__layer-548">
                  <img alt="" className="splatoon-scenes__layer-549" src={img801Ee8A59A314465Babf56Bafd6036A01} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-550" data-node-id="2492:12621">
            <div className="splatoon-scenes__layer-551">
              <div className="splatoon-scenes__layer-552" data-name="801ee8a5-9a31-4465-babf-56bafd6036a0 3">
                <div className="splatoon-scenes__layer-553">
                  <img alt="" className="splatoon-scenes__layer-554" src={img801Ee8A59A314465Babf56Bafd6036A01} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-555" data-node-id="2492:12622">
            <div className="splatoon-scenes__layer-556">
              <div className="splatoon-scenes__layer-557" data-name="801ee8a5-9a31-4465-babf-56bafd6036a0 4">
                <div className="splatoon-scenes__layer-558">
                  <img alt="" className="splatoon-scenes__layer-559" src={img801Ee8A59A314465Babf56Bafd6036A01} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
          <div className="splatoon-scenes__layer-560" data-node-id="2492:12623" data-name="images 1">
            <img alt="" className="splatoon-scenes__layer-561" src={imgImages1} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

    </div>;
}

export default function SplatoonContent() {
  const pageRef = useDesignScale();
  const dialogRef = useRef(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (preview) dialogRef.current.showModal();
  }, [preview]);
  const closePreview = () => { dialogRef.current.close(); setPreview(null); };
  return <div className="splatoon-content" ref={pageRef}>
    <h1 className="sr-only">스플래툰 3 — 나의 색깔로 세상을 물들이세요!</h1>
    <div className="splatoon-content__navigation"><Navigation variant="red" /></div>
    <SplatoonScenes onPreview={setPreview} />
    <NintendoFooter />
    <dialog className="splatoon-content__preview" ref={dialogRef} onClose={() => setPreview(null)} onClick={event => {
      if (event.target === event.currentTarget) closePreview();
    }} aria-labelledby="splatoon-preview-title">
      {preview && <div className="splatoon-content__preview-inner">
        <button type="button" onClick={closePreview} aria-label="이미지 닫기">닫기 ×</button>
        <h2 id="splatoon-preview-title">{preview.name}</h2>
        <img src={preview.image} alt={preview.name} width="600" height="500" />
      </div>}
    </dialog>
  </div>;
}
