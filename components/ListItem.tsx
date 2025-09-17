import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { workType } from '../interfaces';

const ListItem = () => {
  const {
    currentItem: {
      companyName,
      logo,
      workTypes,
      address,
      dateStartByCity,
      timeStartByCity,
      timeEndByCity,
      currentWorkers,
      customerRating,
      customerFeedbacksCount,
      priceWorker,
      planWorkers,
    },
  } = useSelector((state: RootState) => state.list);
  return (
    <View style={styles.container}>
      <TouchableOpacity />
      <View style={styles.containerWrapper}>
        <View style={[styles.titleContainer, styles.content]}>
          <Text style={styles.title}>{companyName}</Text>
          <Image source={{ uri: `${logo}` }} width={80} height={80} />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            {workTypes.map((wType: workType) => wType.name)}
          </Text>
          <Text style={styles.text}>{address}</Text>
          <Text style={styles.text}>День начала смены: {dateStartByCity}</Text>
          <Text style={styles.text}>Время начала смены: {timeStartByCity}</Text>
          <Text style={styles.text}>
            Время окончания смены: {timeEndByCity}
          </Text>
          <Text style={styles.text}>
            Сумма выплаты за смену (в рублях): {priceWorker}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            {customerRating
              ? `Рейтинг нанимателя: ${customerRating}`
              : 'У этого нанимателя еще нет рейтинга'}
          </Text>
          <Text style={styles.text}>
            Количество отзывов о клиенте: {customerFeedbacksCount}
          </Text>
          <Text style={styles.text}>
            Сколько людей уже набрано: {currentWorkers}
          </Text>
          <Text style={styles.text}>
            Сколько людей требуется: {planWorkers}
          </Text>
        </View>
      </View>
      <View />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerWrapper: {
    flexDirection: 'column',
    gap: 20,
  },
  content: {
    gap: 10,
    backgroundColor: 'white',
    padding: 20,
    boxSizing: 'border-box',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
  },
});
export default ListItem;
