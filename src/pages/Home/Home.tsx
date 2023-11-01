import { useEffect, useState } from "react";
import BetButton from "./ui/BetButton";
import GraphComponent from "./components/GraphComponent";
import BetDurationButton from "./ui/BetDurationButton";
import PlaceBetButton from "./ui/PlaceBetButton";
import DurationInput from "./ui/DurationInput";
import BetsBoard from "./components/BetsBoard";
import finnhubApi from "../../api/finnhub/FinnhubApi";
import hasToken from "../../utils/isLoggedIn";
import getUserData from "../../api/getUserData";
import { TradeDataProps, User } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import goToRoute from "../../utils/goToRoute";

export default function Home() {
  const [tradeData, setTradeData] = useState<TradeDataProps[] | undefined>(
    undefined
  );

  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [duration, setDuration] = useState<string>("1h");
  const [userData, setUserData] = useState<User>();

  const [noFetch, setNoFetch] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setNoFetch(false);
    async function socket() {
      finnhubApi(setTradeData, tradeData);
    }
    socket();

    // localStorage.removeItem("authorization");

    async function userData() {
      if (hasToken()) {
        try {
          const userData = await getUserData();

          if (userData === undefined) {
            setNoFetch(true);
          }
          if (userData) {
            setUserData({
              balance: userData.balance,
            });
          }
        } catch (err) {
          setNoFetch(true);
          console.error(err);
        }

        // const userBets = await getUserBets();
        // if (!userBets) {
        //   console.log("no bets");
        // } else {
        //   console.log(userBets);
        // }

        // const data: User = getUserData();
        // setUserData(data);
      } else {
        setNoFetch(true);
      }
    }
    // function onComplete(userData) {
    //   if (userData === undefined) {
    //     navigate("/login");
    //   }
    // }
    userData();

    // fetchEndPrice(1697346450, 1697346510);
  }, []);

  useEffect(() => {
    if (noFetch === true) {
      console.log("heheh");
      navigate("/login");
    }
  }, [noFetch]);

  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="w-[1500px] h-[100%] bg-main flex-col relative mt-5">
        <GraphComponent tradeData={tradeData} />
        <div className="flex w-[100%]">
          <div className="h-[fit-content] flex flex-col gap-5 p-[50px]">
            <BetButton
              amount={100}
              setSelectedAmount={setSelectedAmount}
              selectedAmount={selectedAmount}
            />
            <BetButton
              amount={1000}
              setSelectedAmount={setSelectedAmount}
              selectedAmount={selectedAmount}
            />
            <BetButton
              amount={10000}
              setSelectedAmount={setSelectedAmount}
              selectedAmount={selectedAmount}
            />
          </div>
          <div className="h-[100%] flex flex-col p-[50px] gap-5">
            <div className="flex justify-left w-[100%] gap-[30px] tracking-wider h-[fit-content]">
              <div className="w-[200px] h-[70px] p-4 rounded-[10px] bg-g1 flex items-center">
                <div className="text-[30px] text-g3 flex justify-between w-[100%]">
                  <div>BET:</div>
                  <div>{selectedAmount}$</div>
                </div>
              </div>
              <div className="w-[300px] h-[70px] p-4 rounded-[10px] bg-g1 flex items-center">
                <h1 className="text-[30px] text-g3">
                  {userData?.balance && `BALANCE: $${userData.balance}`}
                </h1>
              </div>
            </div>
            <div className="flex w-[100%] h-[70px] gap-[30px]">
              <BetDurationButton time={parseInt(duration)} />
              <DurationInput
                inputValue={duration}
                setInputValue={setDuration}
              />
            </div>
            <PlaceBetButton />
          </div>
          <BetsBoard />
        </div>
      </div>
    </div>
  );
}
