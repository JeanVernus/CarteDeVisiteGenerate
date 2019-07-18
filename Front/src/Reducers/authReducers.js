export default function (store = {}, action ){
  switch (action.type) {
    case 'CREATE TOKEN USER': {
      const { tokenUser } = action;
      return { ...store, tokenUser };
    }
    case 'PROFILE': {
      const {
        nomProfile,
        prenomProfile,
        posteProfile,
        societeProfile,
        sloganProfile,
        siretProfile,
        telProfile,
        mailProfile,
        photoProfile
      } = action;
      return {
        ...store,
        nomProfile,
        prenomProfile,
        posteProfile,
        societeProfile,
        sloganProfile,
        siretProfile,
        telProfile,
        mailProfile,
        photoProfile
      }
    }
    default:
      return store;
  }
} 