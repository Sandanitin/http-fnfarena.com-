import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReviewsProvider } from './Context/ReviewsContext.jsx'
import { EventsDetailsProvider } from './Context/EventsDetailsContext.jsx'
import { FoodProvider } from './Context/FoodContext.jsx'
import { MetricsProvider } from './Context/MetricsContext.jsx'
import { BookingProvider } from './Context/BookingContext.jsx'
import { VisionProvider } from './Context/VisionContext.jsx'
import { PaintballProvider } from './Context/PaintballContext.jsx'
import { GoKartProvider } from './Context/GoKartContext.jsx'
import { BowlingProvider } from './Context/BowlingContext.jsx'
import { LaserTagProvider } from './Context/LaserTagContext.jsx'
import { SoftPlayProvider } from './Context/SoftPlayContext.jsx'
import { ArcadeProvider } from './Context/ArcadeContext.jsx'
import { HomeProvider } from './Context/HomeContext.jsx'
import { BirthdayBookingProvider } from './Context/BirthdayBookingContext.jsx'
import { EventMediaProvider } from './Context/EventMediaContext.jsx'
import {ContactProvider} from './Context/ContactContext.jsx'
import { GalleryProvider } from './Context/GalleryContext.jsx'
import { ArenaActivitiesProvider } from './Context/ArenaActivitiesContext.jsx'
import {GoKartGridProvider} from './Context/GoKartGridContext.jsx'
import { ActivityDataProvider } from './Context/ActivityDataContext.jsx'
import { EventDataProvider } from './Context/EventDataContext.jsx'
import {EventPackagesProvider} from './Context/EventPackagesContext.jsx'
import {ContactBookingProvider} from './Context/ContactBookingContext.jsx'
import {OffersProvider} from './Context/OffersContext.jsx'
import { MenuDocumentsProvider } from './Context/MenuDocumentsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReviewsProvider>
      <EventsDetailsProvider>
        <FoodProvider>
          <MetricsProvider>
            <BookingProvider>
              <VisionProvider>
                <PaintballProvider>
                  <GoKartProvider>
<BowlingProvider>
<LaserTagProvider>
  <SoftPlayProvider>
    <ArcadeProvider>
      <HomeProvider>
        <BirthdayBookingProvider>
          <EventMediaProvider>
            <ContactProvider>
              <GalleryProvider>
                <ArenaActivitiesProvider>
                  <GoKartGridProvider>
                    <ActivityDataProvider>
                      <EventDataProvider>
                        <EventPackagesProvider>
                          <ContactBookingProvider>
                            <OffersProvider>
                              <MenuDocumentsProvider>
                             <App />
                              </MenuDocumentsProvider>
                             </OffersProvider>
                          </ContactBookingProvider>
                        </EventPackagesProvider>
                      </EventDataProvider>
                    </ActivityDataProvider>
                  </GoKartGridProvider>
                </ArenaActivitiesProvider>
            </GalleryProvider>
            </ContactProvider>
          </EventMediaProvider>
        </BirthdayBookingProvider>
    </HomeProvider>
    </ArcadeProvider>
    </SoftPlayProvider>
    </LaserTagProvider>
    </BowlingProvider>
    </GoKartProvider>
    </PaintballProvider>
    </VisionProvider>

    </BookingProvider>
    </MetricsProvider>
</FoodProvider>
    </EventsDetailsProvider>
    </ReviewsProvider>
  </StrictMode>,
)
